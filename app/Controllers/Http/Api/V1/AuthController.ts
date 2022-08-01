import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Welcome from 'App/Mailers/Welcome'
import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/Api/V1/CreateUserValidator'
import LoginValidator from 'App/Validators/Api/V1/LoginValidator'

export default class AuthController {
  public async register({ auth, request }: HttpContextContract) {
    const userData = await request.validate(CreateUserValidator)

    const user = await User.create(userData)
    const token = await auth.use('api').login(user, { expiresIn: '1 week' })

    await new Welcome(user).sendLater()

    return { user, token }
  }

  public async login({ auth, request }: HttpContextContract) {
    const { email, password } = await request.validate(LoginValidator)

    const token = await auth.use('api').attempt(email, password, { expiresIn: '1 week' })
    const user = auth.use('api').user!

    return { user, token }
  }

  public async logout({ auth }: HttpContextContract) {
    await auth.use('api').logout()
  }
}
