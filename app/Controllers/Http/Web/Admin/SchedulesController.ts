import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ScheduleRepeat } from 'App/Enums/ScheduleRepeat'
import Room from 'App/Models/Room'
import Schedule from 'App/Models/Schedule'
import CreateBaseScheduleValidator from 'App/Validators/Web/Admin/CreateBaseScheduleValidator'
import CreateMonthlyScheduleValidator from 'App/Validators/Web/Admin/CreateMonthlyScheduleValidator'
import CreateWeeklyScheduleValidator from 'App/Validators/Web/Admin/CreateWeeklyScheduleValidator'

export default class SchedulesController {
  public async create({ inertia, bouncer, params }: HttpContextContract) {
    await bouncer.authorize('admin')
    const room = await Room.query().where('id', params.roomId).firstOrFail()

    return inertia.render('Admin/Schedules/Create', { room })
  }

  public async store({ params, request, response, bouncer }: HttpContextContract) {
    await bouncer.authorize('admin')
    const room = await Room.findOrFail(params.roomId)
    const data = await request.validate(CreateBaseScheduleValidator)

    if ([ScheduleRepeat.ONCE, ScheduleRepeat.DAILY, ScheduleRepeat.YEARLY].includes(data.repeat)) {
      await room
        .related('schedules')
        .create({ ...data, startTime: data.startTime?.toFormat('HH:mm'), endTime: data.endTime?.toFormat('HH:mm') })
    }

    if (data.repeat === ScheduleRepeat.WEEKLY) {
      const { daysOfWeek } = await request.validate(CreateWeeklyScheduleValidator)
      await room.related('schedules').create({
        ...data,
        startTime: data.startTime?.toFormat('HH:mm'),
        endTime: data.endTime?.toFormat('HH:mm'),
        daysOfWeek,
      })
    }

    if (data.repeat === ScheduleRepeat.MONTHLY) {
      const monthlyData = await request.validate(CreateMonthlyScheduleValidator)
      await room.related('schedules').create({
        ...data,
        startTime: data.startTime?.toFormat('HH:mm'),
        endTime: data.endTime?.toFormat('HH:mm'),
        ...monthlyData,
      })
    }

    return response.redirect().toRoute('rooms.schedules', { roomId: room.id })
  }

  public async destroy({ params, bouncer, response }: HttpContextContract) {
    await bouncer.authorize('admin')

    const event = await Schedule.findOrFail(params.id)
    await event.softDelete()

    return response.redirect().toRoute('rooms.schedules', { roomId: event.roomId })
  }
}
