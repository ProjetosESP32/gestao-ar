import Event from '@ioc:Adonis/Core/Event'
import type { EventsList } from '@ioc:Adonis/Core/Event'
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
    const nowTime = now.toFormat('HH:mm:ss')
    const rooms = await Room.query({ client })
      .innerJoin('events', 'rooms.id', 'events.room_id')
      .where('events.start_date', '<', nowSQL)
      .where('events.end_date', '>', nowSQL)
      .preload('events', eventBuilder => {
        eventBuilder
          .where('startDate', '<', nowSQL)
          .where('endDate', '>', nowSQL)
          .preload('eventRecurrences', recurrencyBuilder => {
            recurrencyBuilder
              .where('daysOfWeek', 'LIKE', `%${now.weekday}%`)
              .where('daysOfMonth', 'LIKE', `%${now.day}%`)
              .where('startTime', '<', nowTime)
              .where('endTime', '>', nowTime)
          })
      })
      .preload('esps')

    const eventToEmit = rooms
      .map(room => {
        const [event] = room.events
        const recurrency = event.eventRecurrences.length
        const isActive = room.esps.some(({ isOn }) => isOn)

        if (isActive && recurrency === 0) {
          return { esps: room.esps, data: 0 }
        }

        if (!isActive && recurrency > 0) {
          return { esps: room.esps, data: 1 }
        }
      })
      .filter(Boolean) as EventsList['air-change:dispatchAll']

    await Event.emit('air-change:dispatchAll', eventToEmit)
    await client.commit()
  },
  ms('30m'),
)
