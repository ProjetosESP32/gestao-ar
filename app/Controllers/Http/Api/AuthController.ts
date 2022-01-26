import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Welcome from 'App/Mailers/Welcome'
import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/Api/CreateUserValidator'
import LoginValidator from 'App/Validators/Api/LoginValidator'

export default class AuthController {
  public async register({ auth, request }: HttpContextContract) {
    const userData = await request.validate(CreateUserValidator)

    const user = await User.create(userData)
    const token = await auth.use('api').login(user)

    await new Welcome(user).sendLater()

    return { user, token }
  }

  public async login({ auth, request }: HttpContextContract) {
    const { email, password } = await request.validate(LoginValidator)

    const token = await auth.use('api').attempt(email, password)
    const user = await User.findBy('email', email)

    return { user, token }
  }

  public async logout({ auth }: HttpContextContract) {
    await auth.use('api').logout()
  }
}