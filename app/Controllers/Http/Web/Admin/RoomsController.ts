import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Room from 'App/Models/Room'
import CreateRoomValidator from 'App/Validators/Web/Admin/CreateRoomValidator'
import UpdateRoomValidator from 'App/Validators/Web/Admin/UpdateRoomValidator'

export default class RoomsController {
  public async store({ request, response, bouncer, session }: HttpContextContract) {
    await bouncer.authorize('admin')
    const data = await request.validate(CreateRoomValidator)

    await Room.create(data)

    session.flash('alert', {
      severity: 'success',
      message: 'Sala criada com sucesso',
    })

    return response.redirect().toRoute('rooms.index')
  }

  public async update({ params, request, response, bouncer, session }: HttpContextContract) {
    await bouncer.authorize('admin')
    const room = await Room.findOrFail(params.id)
    const data = await request.validate(UpdateRoomValidator)

    room.merge(data)
    await room.save()

    session.flash('alert', {
      severity: 'success',
      message: 'Sala atualizada com sucesso',
    })

    return response.redirect().toRoute('rooms.index')
  }

  public async destroy({ params, response, bouncer, session }: HttpContextContract) {
    await bouncer.authorize('admin')
    const room = await Room.findOrFail(params.id)

    await room.delete()

    session.flash('alert', {
      severity: 'success',
      message: 'Sala deletada com sucesso',
    })

    return response.redirect().toRoute('rooms.index')
  }
}
