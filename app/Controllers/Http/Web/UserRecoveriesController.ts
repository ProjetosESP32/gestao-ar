import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { recoverPassword } from 'App/Services/Users/recoverPassword'
import ResetPasswordValidator from 'App/Validators/ResetPasswordValidator'

export default class UserRecoveriesController {
  public async create({ inertia }: HttpContextContract) {
    return inertia.render('User/RecoverPassword')
  }

  public async store(context: HttpContextContract) {
    await recoverPassword(context)

    return context.response.redirect('/auth/login')
  }

  public async edit({ inertia }: HttpContextContract) {
    return inertia.render('User/ChangePassword')
  }

  public async update({ auth, request, params, response }: HttpContextContract) {
    await auth.use('web').logout(false)

    const { password } = await request.validate(ResetPasswordValidator)
    const user = await User.findByOrFail('email', params.email)

    user.password = password

    await user.save()

    return response.redirect('/auth/login')
  }
}
