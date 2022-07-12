import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Room from 'App/Models/Room'

export default class RoomsController {
  public async index({ inertia, request }: HttpContextContract) {
    const { page, perPage } = request.qs()
    const pageNumber = Number(page) || 1
    const perPageNumber = Number(perPage) || 10

    const rooms = await Room.query().paginate(pageNumber, perPageNumber)

    return inertia.render('Rooms/Index', { rooms })
  }
}
