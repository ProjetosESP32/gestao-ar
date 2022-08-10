import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Welcome from 'App/Mailers/Welcome'
import User from 'App/Models/User'
import { generatePassword } from 'App/Utils/generatePassword'
import { getAttachment } from 'App/Utils/getAttachment'

export default class GoogleAuthController {
  public async create({ ally }: HttpContextContract) {
    return ally.use('google').redirect()
  }

  public async store({ ally, auth, response, session, request }: HttpContextContract) {
    const allyInstance = ally.use('google')

    if (allyInstance.hasError() || allyInstance.stateMisMatch()) {
      session.flash('alert', {
        severity: 'error',
        message: 'Ocorreu um erro ao fazer o login com o Google, reinicie a página e tente novamente',
      })
      return response.redirect().toRoute('auth.login.create')
    }

    const googleUser = await allyInstance.user()
    const linkUser = request.cookie('link_user')
    const authUser = auth.use('web').user

    if (linkUser && !authUser) {
      session.flash('alert', {
        severity: 'error',
        message: 'Não é possível vincular conta Google a uma conta que não está logada',
      })
      return response.redirect().toRoute('auth.login.create')
    }

    if (!linkUser && authUser) {
      session.flash('alert', {
        severity: 'error',
        message: 'Não foi possível vincular conta Google',
      })
      return response.redirect().toRoute('users.profile')
    }

    if (linkUser && authUser) {
      authUser.googleId = googleUser.id
      await authUser.save()

      response.clearCookie('link_user')
      session.flash('alert', { severity: 'success', message: 'Conta Google vinculada com sucesso' })
      return response.redirect().toRoute('users.profile')
    }

    const userByEmail = await User.query().where('email', googleUser.email!).whereNull('google_id').first()

    if (userByEmail) {
      session.flash('alert', {
        severity: 'error',
        message: 'Não é possível fazer login com o Google',
      })
      return response.redirect().toRoute('auth.login.create')
    }

    const user = await User.firstOrNew(
      { googleId: googleUser.id },
      {
        email: googleUser.email!,
        googleId: googleUser.id,
        password: generatePassword(12),
        username: googleUser.name,
      },
    )

    if (!user.cover && googleUser.avatarUrl) {
      user.cover = await getAttachment(googleUser.avatarUrl)
    }

    await user.save()

    if (!user.emailVerifiedAt) {
      await new Welcome(user).sendLater()
    }

    await auth.use('web').login(user)

    return response.redirect().toRoute('home')
  }
}
