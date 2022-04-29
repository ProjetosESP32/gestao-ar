import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Room from 'App/Models/Room'
import CreateRoomValidator from 'App/Validators/Web/Admin/CreateRoomValidator'
import UpdateRoomValidator from 'App/Validators/Web/Admin/UpdateRoomValidator'

export default class RoomsController {
  public async store({ request, response, bouncer }: HttpContextContract) {
    await bouncer.authorize('admin')
    const data = await request.validate(CreateRoomValidator)

    await Room.create(data)

    return response.redirect('/rooms')
  }

  public async update({ params, request, response, bouncer }: HttpContextContract) {
    await bouncer.authorize('admin')
    const room = await Room.findOrFail(params.id)
    const data = await request.validate(UpdateRoomValidator)

    room.merge(data)
    await room.save()

    return response.redirect('/rooms')
  }

  public async destroy({ params, response, bouncer }: HttpContextContract) {
    await bouncer.authorize('admin')
    const room = await Room.findOrFail(params.id)

    await room.softDelete()

    return response.redirect('/rooms')
  }
}
