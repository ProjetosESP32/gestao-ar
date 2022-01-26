import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Welcome from 'App/Mailers/Welcome'
import User from 'App/Models/User'
import { redirectBackIfLogged } from 'App/Utils/redirectBackIfLogged'
import CreateUserValidator from 'App/Validators/Web/CreateUserValidator'
import LoginValidator from 'App/Validators/Web/LoginValidator'

export default class AuthController {
  public async loginForm({ auth, inertia, response }: HttpContextContract) {
    if (redirectBackIfLogged(auth, response)) return

    return inertia.render('Login/Index')
  }

  public async registerForm({ auth, inertia, response }: HttpContextContract) {
    if (redirectBackIfLogged(auth, response)) return

    return inertia.render('Auth/Register')
  }

  public async register({ request, auth, response }: HttpContextContract) {
    const { rememberMe, ...data } = await request.validate(CreateUserValidator)

    const user = await User.create(data)
    await auth.use('web').login(user, rememberMe)

    await new Welcome(user).sendLater()

    return response.redirect('/')
  }

  public async login({ request, auth, response }: HttpContextContract) {
    const { email, password, rememberMe } = await request.validate(LoginValidator)

    await auth.use('web').attempt(email, password, rememberMe)

    return response.redirect('/')
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.use('web').logout()

    return response.redirect('/')
  }
}
