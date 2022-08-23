import Event, { EventsList } from '@ioc:Adonis/Core/Event'
import Logger from '@ioc:Adonis/Core/Logger'
import Database from '@ioc:Adonis/Lucid/Database'
import { ScheduleRepeat } from 'App/Enums/ScheduleRepeat'
import Room from 'App/Models/Room'
import { Queue, QueueScheduler, Worker } from 'bullmq'
import redis from 'Config/redis'
import { DateTime, Interval } from 'luxon'

const QUEUE_NAME = 'air-cond-queue'
const connectionConfig = { connection: redis.connections.local, sharedConnection: true }

const queue = new Queue(QUEUE_NAME, connectionConfig)

// eslint-disable-next-line no-new
new QueueScheduler(QUEUE_NAME, connectionConfig)

const getWeekNumOfMonth = (dateTime: DateTime) => {
  const firstDay = DateTime.fromObject({
    year: dateTime.year,
    month: dateTime.month,
    day: 1,
  }).weekday
  return Math.ceil((dateTime.day + (firstDay - 1)) / 7)
}

const worker = new Worker(
  QUEUE_NAME,
  async _ => {
    const client = await Database.transaction()

    const eventDataToEmit: EventsList['air-change:dispatchAll'] = []

    const rooms = await Room.query({ client })
      .innerJoin('schedules', 'rooms.id', 'schedules.room_id')
      .innerJoin('schedule_exceptions', 'schedules.id', 'schedule_exceptions.schedule_id')
      .where('schedules.active_until', '>=', Database.raw('NOW()'))
      .where('schedule_exceptions.exception_date', '<>', Database.raw('CURDATE()'))
      .preload('esps')
      .preload('schedules')

    const now = DateTime.now()

    rooms.forEach(({ schedules, esps }) => {
      const isEspsOn = esps.some(({ isOn }) => isOn)
      const isActiveInSchedule = schedules.some(
        ({
          isAllDay,
          repeat,
          scheduleDate,
          startTime,
          endTime,
          repeatInterval,
          daysOfWeek,
          daysOfMonth,
          weekNumber,
          timezone,
        }) => {
          const startDateTime = startTime ? DateTime.fromFormat('HH:mm z', `${startTime} ${timezone}`) : null
          const endDateTime = endTime ? DateTime.fromFormat('HH:mm z', `${endTime} ${timezone}`) : null
          const isInTimeInterval = isAllDay || Interval.fromDateTimes(startDateTime!, endDateTime!).contains(now)

          if (repeat === ScheduleRepeat.ONCE) {
            const isInSameDay = now.hasSame(scheduleDate, 'day')

            return isInSameDay && isInTimeInterval
          }

          if (repeat === ScheduleRepeat.DAILY) {
            const isInInterval = Math.floor(now.diff(scheduleDate, 'day').days) % repeatInterval === 0

            return isInInterval && isInTimeInterval
          }

          if (repeat === ScheduleRepeat.MONTHLY) {
            const isInInterval = Math.floor(now.diff(scheduleDate, 'month').months) % repeatInterval === 0

            if (daysOfMonth) {
              const isInDaysOfMonth = daysOfMonth.includes(now.day)

              return isInInterval && isInDaysOfMonth && isInTimeInterval
            }

            const isInWeekNumber = weekNumber === getWeekNumOfMonth(now)
            const isInDaysOfWeek = daysOfWeek!.includes(now.weekday)

            return isInInterval && isInWeekNumber && isInDaysOfWeek && isInTimeInterval
          }

          if (repeat === ScheduleRepeat.YEARLY) {
            const isInInterval = Math.floor(now.diff(scheduleDate, 'year').years) % repeatInterval === 0

            return isInInterval && isInTimeInterval
          }

          return false
        },
      )

      if (!isEspsOn && isActiveInSchedule) {
        eventDataToEmit.push({
          esps,
          data: 1,
        })
        return
      }

      if (isEspsOn && !isActiveInSchedule) {
        eventDataToEmit.push({
          esps,
          data: 0,
        })
      }
    })

    await Event.emit('air-change:dispatchAll', eventDataToEmit)
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
    cron: '0 */5 * * * *',
  },
})
