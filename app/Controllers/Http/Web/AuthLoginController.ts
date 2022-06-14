import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { redirectBackIfLogged } from 'App/Utils/redirectBackIfLogged'
import LoginValidator from 'App/Validators/Web/LoginValidator'

export default class AuthLoginController {
  public async create({ auth, response, inertia }: HttpContextContract) {
    if (redirectBackIfLogged(auth, response)) return

    return inertia.render('Auth/Login')
  }

  public async store({ request, auth, response }: HttpContextContract) {
    const { email, password, rememberMe } = await request.validate(LoginValidator)

    await auth.use('web').attempt(email, password, rememberMe)

    return response.redirect().toRoute('home')
  }

  public async destroy({ auth, response }: HttpContextContract) {
    await auth.use('web').logout()

    return response.redirect().toRoute('home')
  }
}
