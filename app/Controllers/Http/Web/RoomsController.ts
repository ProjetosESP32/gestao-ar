import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Room from 'App/Models/Room'

export default class RoomsController {
  public async index({ inertia, request, response }: HttpContextContract) {
    const isJson = request.accepts(['json']) === 'json'

    if (isJson) {
      const { search } = request.qs()

      if (typeof search === 'string' && search.length > 0) {
        const rooms = await Room.query().where('name', 'like', `%${search}%`)

        return response.json(rooms, true)
      }

      return response.json([], true)
    }

    const { page, perPage } = request.qs()
    const pageNumber = Number(page) || 1
    const perPageNumber = Number(perPage) || 10

    const rooms = await Room.query().paginate(pageNumber, perPageNumber)

    return inertia.render('Rooms/Index', { rooms })
  }
}
