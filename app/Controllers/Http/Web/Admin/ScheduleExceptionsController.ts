import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Schedule from 'App/Models/Schedule'
import CreateExceptionValidator from 'App/Validators/Web/Admin/CreateExceptionValidator'

export default class ScheduleExceptionsController {
  public async store({ params, request, response, bouncer }: HttpContextContract) {
    await bouncer.authorize('admin')
    const data = await request.validate(CreateExceptionValidator)
    const schedule = await Schedule.query().where('id', params.id).where('roomId', params.roomId).firstOrFail()

    await schedule.related('exceptions').create(data)

    return response.redirect().toRoute('rooms.schedules', { roomId: schedule.roomId })
  }
}
