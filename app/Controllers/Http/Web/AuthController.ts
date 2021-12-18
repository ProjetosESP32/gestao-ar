import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
import LoginValidator from 'App/Validators/LoginValidator'

export default class AuthController {
  public async loginForm({ inertia }: HttpContextContract) {
    return inertia.render('Auth/Login')
  }

  public async store({ request, auth, inertia }: HttpContextContract) {
    const data = await request.validate(CreateUserValidator)
    const user = await User.create(data)

    await auth.use('web').login(user, true)

    return inertia.render('Home/Index')
  }

  public async login({ request, auth, inertia }: HttpContextContract) {
    const { email, password } = await request.validate(LoginValidator)

    await auth.use('web').attempt(email, password, true)

    return inertia.render('Home/Index')
  }
}
