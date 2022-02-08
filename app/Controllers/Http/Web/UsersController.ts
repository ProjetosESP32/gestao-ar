import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { recoverPassword } from 'App/Services/Users/recoverPassword'
import { updatePassword } from 'App/Services/Users/updatePassword'
import { updateUser } from 'App/Services/Users/updateUser'
import ResetPasswordValidator from 'App/Validators/ResetPasswordValidator'
import { DateTime } from 'luxon'

export default class UsersController {
  public async show({ inertia }: HttpContextContract) {
    return inertia.render('User/Profile')
  }

  public async update(context: HttpContextContract) {
    await updateUser(context, 'web')

    return context.response.redirect().toRoute('users.profile')
  }

  public async updatePassword(context: HttpContextContract) {
    await updatePassword(context, 'web')

    return context.response.redirect().toRoute('users.profile')
  }

  public async verifyEmail({ params, inertia }: HttpContextContract) {
    const user = await User.findByOrFail('email', params.email)

    user.emailVerifiedAt = DateTime.now()
    await user.save()

    return inertia.render('User/VerifyEmail')
  }

  public async recoverPasswordView({ inertia }: HttpContextContract) {
    return inertia.render('User/RecoverPassword')
  }

  public async recoverPassword(context: HttpContextContract) {
    await recoverPassword(context)
  }

  public async changePasswordView({ inertia }: HttpContextContract) {
    return inertia.render('User/ChangePassword')
  }

  public async changePassword({ auth, request, params, response }: HttpContextContract) {
    await auth.use('web').logout(false)

    const { password } = await request.validate(ResetPasswordValidator)
    const user = await User.findByOrFail('email', params.email)

    user.password = password

    await user.save()

    return response.redirect('/')
  }
}
