import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Room from 'App/Models/Room'

export default class RoomsController {
  public async index({ inertia }: HttpContextContract) {
    const rooms = await Room.all()

    return inertia.render('Control/RoomsControl', { rooms })
  }

  public async show({ params, inertia }: HttpContextContract) {
    const room = await Room.findOrFail(params.id)

    return inertia.render('Control/RoomControl', { room })
  }
}
