import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Welcome from 'App/Mailers/Welcome'
import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
import LoginValidator from 'App/Validators/LoginValidator'

export default class AuthController {
  public async loginForm({ inertia }: HttpContextContract) {
    return inertia.render('Auth/Login')
  }

  public async registerForm({ inertia }: HttpContextContract) {
    return inertia.render('Auth/Register')
  }

  public async register({ request, auth, response }: HttpContextContract) {
    const { rememberMe, ...data } = await request.validate(CreateUserValidator)
    const user = await User.create(data)

    await new Welcome(user).sendLater()

    await auth.use('web').login(user, rememberMe)

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
