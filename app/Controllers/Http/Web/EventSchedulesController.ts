import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { DateTime } from 'luxon'
import Event from 'App/Models/Event'
import Room from 'App/Models/Room'
import ExtendEventValidator from 'App/Validators/Web/ExtendEventValidator'

export default class EventSchedulesController {
  public async index({ params, request, inertia }: HttpContextContract) {
    const { page, perPage } = request.qs()

    const pageNumber = Number(page) || 1
    const perPageNumber = Number(perPage) || 10

    const events = await Event.query().where('roomId', params.roomId).paginate(pageNumber, perPageNumber)

    return inertia.render('EventSchedules/Index', { events })
  }

  public async update({ auth, params, request, response, session }: HttpContextContract) {
    const user = auth.use('web').user!
    const { amountOfTime } = await request.validate(ExtendEventValidator)

    const room = await Room.findOrFail(params.roomId)

    const nowInstance = DateTime.now()
    const futureTime = nowInstance.plus({ minutes: amountOfTime })

    const event = await room.related('events').create({
      name: 'Extending the operating time of the air conditioner',
      description: `Extending air operating time by ${user.username} by ${amountOfTime} minutes`,
      startDate: nowInstance,
      endDate: futureTime,
    })
    await event.related('eventRecurrences').create({
      daysOfMonth: nowInstance.day.toString(),
      daysOfWeek: nowInstance.weekday.toString(),
      startTime: nowInstance,
      endTime: futureTime,
    })

    session.flash('alert', {
      severity: 'success',
      message: 'Tempo de funcionamento extendido',
    })

    return response.redirect().toRoute('room.eventSchedules.index', { roomId: params.roomId })
  }
}
