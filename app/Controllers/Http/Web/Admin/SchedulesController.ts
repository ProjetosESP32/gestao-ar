import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { EVERY_DAY_OF_MONTH_ARRAY, EVERY_WEEKDAY_ARRAY } from 'App/Constants/time'
import Event from 'App/Models/Event'
import EventRecurrence from 'App/Models/EventRecurrence'
import Room from 'App/Models/Room'
import CreateEventScheduleValidator from 'App/Validators/Web/Admin/CreateEventScheduleValidator'

export default class SchedulesController {
  public async create({ inertia, bouncer, params }: HttpContextContract) {
    await bouncer.authorize('admin')
    const room = await Room.query().where('id', params.roomId).firstOrFail()

    return inertia.render('Admin/Schedules/Create', { room })
  }

  public async store({ params, request, response, bouncer }: HttpContextContract) {
    await bouncer.authorize('admin')
    const { recurrences, ...event } = await request.validate(CreateEventScheduleValidator)

    const room = await Room.findOrFail(params.roomId)

    const newEvent = await room.related('events').create(event)
    const newRecurrences = recurrences.map(({ daysOfMonth, daysOfWeek, ...recurrence }) => {
      const newEventRecurrence = new EventRecurrence()
      newEventRecurrence.merge(recurrence)
      newEventRecurrence.daysOfMonthArray = daysOfMonth.length > 0 ? daysOfMonth : EVERY_DAY_OF_MONTH_ARRAY
      newEventRecurrence.daysOfWeekArray = daysOfWeek.length > 0 ? daysOfWeek : EVERY_WEEKDAY_ARRAY

      return newEventRecurrence
    })

    await newEvent.related('eventRecurrences').saveMany(newRecurrences)

    return response.redirect().toRoute('rooms.schedules', { roomId: room.id })
  }

  public async destroy({ params, bouncer, response }: HttpContextContract) {
    await bouncer.authorize('admin')

    const event = await Event.findOrFail(params.id)
    await event.softDelete()

    return response.redirect().toRoute('rooms.schedules', { roomId: event.roomId })
  }
}
