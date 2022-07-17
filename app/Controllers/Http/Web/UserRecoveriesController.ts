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

    return context.response.redirect().toRoute('home')
  }

  public async edit({ inertia }: HttpContextContract) {
    return inertia.render('User/ChangePassword')
  }

  public async update({ auth, request, params, response, session }: HttpContextContract) {
    await auth.use('web').logout(false)

    const { password } = await request.validate(ResetPasswordValidator)
    const user = await User.findByOrFail('email', params.email)

    user.password = password

    await user.save()

    session.flash('alert', {
      severity: 'success',
      message: 'Senha alterada com sucesso',
    })

    return response.redirect().toRoute('auth.login.create')
  }
}
