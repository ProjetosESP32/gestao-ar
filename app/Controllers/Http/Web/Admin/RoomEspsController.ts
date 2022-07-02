import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Esp from 'App/Models/Esp'
import Room from 'App/Models/Room'
import AddEspToRoomValidator from 'App/Validators/Web/AddEspToRoomValidator'

export default class RoomEspsController {
  public async store({ params, request, response, bouncer }: HttpContextContract) {
    await bouncer.authorize('admin')
    const { espMac } = await request.validate(AddEspToRoomValidator)
    const room = await Room.findOrFail(params.roomId)
    const esp = await Esp.findByOrFail('macAddress', espMac)

    await esp.related('room').associate(room)

    return response.redirect().toRoute('rooms_control.show', [params.roomId])
  }

  public async destroy({ params, response, bouncer }: HttpContextContract) {
    await bouncer.authorize('admin')
    const esp = await Esp.query().where('id', params.id).where('roomId', params.roomId).firstOrFail()

    await esp.related('room').dissociate()

    return response.redirect().toRoute('rooms_control.show', [params.roomId])
  }
}
