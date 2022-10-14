import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ScheduleRepeat } from 'App/Enums/ScheduleRepeat'
import Room from 'App/Models/Room'
import ExtendOperatingTimeValidator from 'App/Validators/Web/ExtendOperatingTimeValidator'
import { DateTime } from 'luxon'

export default class SchedulesController {
  public async index({ params, inertia, bouncer }: HttpContextContract) {
    const room = await Room.query()
      .preload('schedules', scheduleBuilder => {
        scheduleBuilder.preload('exceptions')
      })
      .where('id', params.roomId)
      .firstOrFail()

    const canEdit = await bouncer.allows('updateRoom', room)

    return inertia.render('Schedules/Show', { room, canEdit })
  }

  public async store({ params, request, response, session, bouncer }: HttpContextContract) {
    const room = await Room.findOrFail(params.roomId)
    await bouncer.authorize('updateRoom', room)
    const { amountOfTime } = await request.validate(ExtendOperatingTimeValidator)

    const nowInstance = DateTime.now()
    const futureTime = nowInstance.plus({ minutes: amountOfTime })

    await room.related('schedules').create({
      name: 'Aumento do tempo de operação',
      startTime: nowInstance.toFormat('HH:mm'),
      endTime: futureTime.toFormat('HH:mm'),
      scheduleDate: nowInstance,
      activeUntil: futureTime,
      repeat: ScheduleRepeat.ONCE,
    })

    session.flash('alert', {
      severity: 'success',
      message: 'Tempo de funcionamento extendido',
    })

    return response.redirect().toRoute('rooms.schedules', { roomId: params.roomId })
  }
}
