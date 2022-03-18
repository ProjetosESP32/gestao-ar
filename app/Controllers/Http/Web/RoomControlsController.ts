import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Room from 'App/Models/Room'

export default class RoomControlsController {
  public async show({ params, inertia, auth }: HttpContextContract) {
    const room = await Room.firstOrFail(params.id)
    const canEdit = auth.use('web').isLoggedIn

    return inertia.render('Control/RoomControl', { room, canEdit })
  }
}
