import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Esp from 'App/Models/Esp'
import Room from 'App/Models/Room'

export default class RoomControlsController {
  public async show({ params, inertia, auth }: HttpContextContract) {
    const { user } = auth.use('web')
    const room = await Room.findOrFail(params.id)
    const esps = await Esp.query().whereNot('roomId', room.id).orWhereNull('roomId')

    if (user?.isRoot) {
      return inertia.render('Control/RoomControl', { room, canEdit: true, esps })
    }

    const isUserRelatedToRoom = await user?.related('rooms').query().where('id', params.id).getCount()
    const canEdit = !!isUserRelatedToRoom

    return inertia.render('Control/RoomControl', { room, canEdit, esps })
  }
}
