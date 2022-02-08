import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RoomControlsController {
  public async index({ inertia }: HttpContextContract) {
    return inertia.render('RoomControl/Index')
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
