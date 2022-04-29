import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Welcome from 'App/Mailers/Welcome'
import User from 'App/Models/User'
import { redirectBackIfLogged } from 'App/Utils/redirectBackIfLogged'
import CreateUserValidator from 'App/Validators/Web/CreateUserValidator'

export default class AuthRegisterController {
  public async create({ auth, response, inertia }: HttpContextContract) {
    if (redirectBackIfLogged(auth, response)) return

    return inertia.render('Auth/Register')
  }

  public async store({ request, auth, response }: HttpContextContract) {
    const { rememberMe, ...data } = await request.validate(CreateUserValidator)

    const user = await User.create(data)
    await auth.use('web').login(user, rememberMe)

    await new Welcome(user).sendLater()

    return response.redirect().toRoute('home')
  }
}
