import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Event from 'App/Models/Event'
import CreateEventScheduleValidator from 'App/Validators/Web/Admin/CreateEventScheduleValidator'
import UpdateEventScheduleValidator from 'App/Validators/Web/Admin/UpdateEventScheduleValidator'

export default class EventSchedulesController {
  private async getEventByIdAndRoom(eventId: number, roomId: number) {
    return Event.query().where('roomId', roomId).where('id', eventId).preload('eventRecurrences').firstOrFail()
  }

  public async create({ inertia, bouncer }: HttpContextContract) {
    await bouncer.authorize('admin')
    return inertia.render('EventSchedules/Create')
  }

  public async store({ params, request, response, bouncer }: HttpContextContract) {
    await bouncer.authorize('admin')
    const { recurrences, ...event } = await request.validate(CreateEventScheduleValidator)

    const newEvent = await Event.create(event)
    const mappedRecurrences = recurrences.map(({ daysOfMonth, daysOfWeek, ...times }) => ({
      daysOfMonth: daysOfMonth.join(','),
      daysOfWeek: daysOfWeek.join(','),
      ...times,
    }))

    await newEvent.related('eventRecurrences').createMany(mappedRecurrences)

    return response.redirect().toRoute('room.eventSchedules.index', { roomId: params.roomId })
  }

  public async show({ params, inertia, bouncer }: HttpContextContract) {
    await bouncer.authorize('admin')
    const event = await this.getEventByIdAndRoom(params.id, params.roomId)

    return inertia.render('EventSchedules/Show', { event })
  }

  public async update({ params, request, response, bouncer }: HttpContextContract) {
    await bouncer.authorize('admin')
    const eventToUpdate = await this.getEventByIdAndRoom(params.id, params.roomId)
    const { recurrences, ...dataEventToUpdate } = await request.validate(UpdateEventScheduleValidator)

    eventToUpdate.merge(dataEventToUpdate)
    await eventToUpdate.save()

    if (recurrences) {
      const mappedRecurrences = recurrences.map(({ daysOfMonth, daysOfWeek, ...times }) => ({
        daysOfMonth: daysOfMonth?.join(','),
        daysOfWeek: daysOfWeek?.join(','),
        ...times,
      }))

      await eventToUpdate
        .related('eventRecurrences')
        .updateOrCreateMany(mappedRecurrences, ['daysOfMonth', 'daysOfWeek', 'startTime', 'endTime'])
    }

    return response.redirect().toRoute('room.eventSchedules.index', { roomId: params.roomId })
  }

  public async destroy({ params, response, bouncer }: HttpContextContract) {
    await bouncer.authorize('admin')
    const event = await this.getEventByIdAndRoom(params.id, params.roomId)

    await event.softDelete()

    return response.redirect().toRoute('room.eventSchedules.index', { roomId: params.roomId })
  }
}
