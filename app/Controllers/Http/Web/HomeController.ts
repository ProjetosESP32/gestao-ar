import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class HomeController {
  public async index({ inertia, auth }: HttpContextContract) {
    const { user } = auth

    return inertia.render('Home/Index', { user })
  }
}
