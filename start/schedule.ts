import Event, { EventsList } from '@ioc:Adonis/Core/Event'
import Logger from '@ioc:Adonis/Core/Logger'
import Database from '@ioc:Adonis/Lucid/Database'
import { Queue, Worker, QueueScheduler } from 'bullmq'
import { DateTime } from 'luxon'
import Room from 'App/Models/Room'
import redis from 'Config/redis'

const QUEUE_NAME = 'air-cond-queue'
const connectionConfig = { connection: redis.connections.local, sharedConnection: true }

const queue = new Queue(QUEUE_NAME, connectionConfig)

// eslint-disable-next-line no-new
new QueueScheduler(QUEUE_NAME, connectionConfig)

const worker = new Worker(
  QUEUE_NAME,
  async _ => {
    const client = await Database.transaction()

    const now = DateTime.now()
    const nowSQL = now.toSQL()
    const nowTime = now.toFormat('HH:mm:ss')
    const rooms = await Room.query({ client })
      .select('rooms.*')
      .innerJoin('events', 'rooms.id', 'events.room_id')
      .innerJoin('events_recurrences', 'events.id', 'events_recurrences.event_id')
      .where('events.start_date', '<', nowSQL)
      .where('events.end_date', '>', nowSQL)
      .where('events_recurrences.days_of_week', 'LIKE', `%${now.weekday}%`)
      .where('events_recurrences.days_of_month', 'LIKE', `%${now.day}%`)
      .where('events_recurrences.start_time', '<', nowTime)
      .where('events_recurrences.end_time', '>', nowTime)
      .preload('events', eventBuilder =>
        eventBuilder
          .where('startDate', '<', nowSQL)
          .where('endDate', '>', nowSQL)
          .preload('eventRecurrences', eventRecurrenceBuilder =>
            eventRecurrenceBuilder
              .where('daysOfWeek', 'LIKE', `%${now.weekday}%`)
              .where('daysOfMonth', 'LIKE', `%${now.day}%`)
              .where('startTime', '<', nowTime)
              .where('endTime', '>', nowTime),
          ),
      )
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

        return null
      })
      .filter(Boolean) as EventsList['air-change:dispatchAll']

    await Event.emit('air-change:dispatchAll', eventToEmit)
    await client.commit()
  },
  connectionConfig,
)

worker.on('active', ({ name }) => {
  Logger.info(`Job ${name} is active`)
})

worker.on('completed', ({ name }) => {
  Logger.info(`Job ${name} has completed`)
})

worker.on('failed', ({ name, failedReason }) => {
  Logger.error(`Job ${name} has failed with reason: ${failedReason}`)
})

queue.add('power', undefined, {
  repeat: {
    cron: '0 */15 * * * *',
  },
})
