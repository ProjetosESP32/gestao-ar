import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import { DateTime } from 'luxon'
import Room from 'App/Models/Room'
import ExtendEventValidator from 'App/Validators/Web/ExtendEventValidator'

export default class SchedulesController {
  public async index({ params, inertia, bouncer }: HttpContextContract) {
    const room = await Room.query()
      .preload('events', eventsBuilder => {
        eventsBuilder.preload('eventRecurrences').where('endDate', '>', Database.raw('NOW()'))
      })
      .where('id', params.roomId)
      .firstOrFail()

    const canEdit = await bouncer.allows('updateRoom', room)

    return inertia.render('Schedules/Show', { room, canEdit })
  }

  public async store({ auth, params, request, response, session, bouncer }: HttpContextContract) {
    const room = await Room.findOrFail(params.roomId)
    await bouncer.authorize('updateRoom', room)
    const { amountOfTime } = await request.validate(ExtendEventValidator)

    const user = auth.use('web').user!

    const nowInstance = DateTime.now()
    const futureTime = nowInstance.plus({ minutes: amountOfTime })

    const event = await room.related('events').create({
      name: 'Aumento da operação',
      description: `Aumento do tempo de operação do ar pelo ${user.username} por ${amountOfTime} minutos`,
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

    return response.redirect().toRoute('rooms.schedules', { roomId: params.roomId })
  }
}
