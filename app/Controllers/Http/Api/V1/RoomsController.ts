import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Room from 'App/Models/Room'

export default class RoomsController {
  public async index({ request }: HttpContextContract) {
    const { page, perPage } = request.qs()
    const pageNumber = Number(page) || 1
    const perPageNumber = Number(perPage) || 10

    const rooms = await Room.query()
      .preload('esps')
      .preload('schedules', scheduleBuilder => {
        scheduleBuilder.preload('exceptions')
      })
      .paginate(pageNumber, perPageNumber)

    return rooms
  }
}
