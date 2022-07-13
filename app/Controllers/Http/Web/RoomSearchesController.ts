import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Room from 'App/Models/Room'

export default class RoomSearchesController {
  public async index({ request, response }: HttpContextContract) {
    const { search } = request.qs()
    const rooms = await Room.query().where('name', 'like', `%${search}%`)

    return response.json(rooms, true)
  }
}
