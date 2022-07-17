import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { DateTime } from 'luxon'
import User from 'App/Models/User'
import { updatePassword } from 'App/Services/Users/updatePassword'
import { updateUser } from 'App/Services/Users/updateUser'

export default class UsersController {
  public async show({ inertia, auth }: HttpContextContract) {
    const user = auth.use('web').user!
    await user.load('rooms')

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

  public async deletePhoto({ response, auth }: HttpContextContract) {
    const user = auth.use('web').user!

    if (user.cover) {
      user.cover = null
      await user.save()
    }

    return response.redirect().toRoute('users.profile')
  }

  public async linkGoogleAccount({ ally, response }: HttpContextContract) {
    response.cookie('link_user', true, { sameSite: false, maxAge: '5m' })

    return ally.use('google').redirect()
  }
}
