import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Esp from 'App/Models/Esp'
import Room from 'App/Models/Room'
import AddEspToRoomValidator from 'App/Validators/Web/AddEspToRoomValidator'

export default class RoomControlsController {
  public async show({ params, inertia, auth }: HttpContextContract) {
    const room = await Room.findOrFail(params.id)
    const canEdit = auth.use('web').isLoggedIn
    const esps = await Esp.query().whereNot('roomId', room.id).orWhereNull('roomId')

    return inertia.render('Control/RoomControl', { room, canEdit, esps })
  }

  public async addEsp({ params, request, response }: HttpContextContract) {
    const { espMac } = await request.validate(AddEspToRoomValidator)
    const room = await Room.findOrFail(params.id)
    const esp = await Esp.findByOrFail('macAddress', espMac)

    await esp.related('room').associate(room)

    return response.redirect().toRoute('rooms.control.show', [params.id])
  }

  public async removeEsp({ params, response }: HttpContextContract) {
    const esp = await Esp.query().where('id', params.espId).where('roomId', params.id).firstOrFail()

    await esp.related('room').dissociate()

    return response.redirect().toRoute('rooms.control.show', [params.id])
  }
}
