import Event from '@ioc:Adonis/Core/Event'
import Database from '@ioc:Adonis/Lucid/Database'
import Scheduler from '@ioc:App/Scheduler'
import { DateTime } from 'luxon'
import ms from 'ms'
import Room from 'App/Models/Room'

Scheduler.registerTask(
  'updateAirState',
  async () => {
    const client = await Database.transaction()

    const now = DateTime.now()
    const nowSQL = now.toSQL()
    const rooms = await Room.query({ client })
      .innerJoin('events', 'rooms.id', 'events.room_id')
      .where('events.start_date', '<', nowSQL)
      .where('events.end_date', '>', nowSQL)
      .preload('events', builder => {
        builder.where('startDate', '<', nowSQL).where('endDate', '>', nowSQL)
      })
      .preload('esps')

    const promises = rooms.map(async room => {
      const [event] = room.events
      const isActive = room.esps.some(({ isOn }) => isOn)
      const nowTime = now.toFormat('HH:mm:ss')

      const recurrency = await event
        .related('eventRecurrences')
        .query()
        .where('daysOfWeek', 'LIKE', `%${now.weekday}%`)
        .where('daysOfMonth', 'LIKE', `%${now.day}%`)
        .where('startTime', '<', nowTime)
        .where('endTime', '>', nowTime)
        .useTransaction(client)
        .getCount()

      if (isActive && recurrency === 0n) {
        await Event.emit('air-change:dispatch', { room, data: 0 })
        return
      }

      if (!isActive && recurrency > 0n) {
        await Event.emit('air-change:dispatch', { room, data: 1 })
        return
      }
    })

    await Promise.all(promises)
    await client.commit()
  },
  ms('30m'),
)
