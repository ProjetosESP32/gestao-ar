import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { DateTime } from 'luxon'
import Welcome from 'App/Mailers/Welcome'
import User from 'App/Models/User'
import { generatePassword } from 'App/Utils/generatePassword'
import { getAttachment } from 'App/Utils/getAttachment'

export default class GoogleAuthController {
  public async create({ ally }: HttpContextContract) {
    return ally.use('google').redirect()
  }

  public async store({ ally, auth, response, session }: HttpContextContract) {
    const allyInstance = ally.use('google')

    if (allyInstance.hasError() || allyInstance.stateMisMatch()) {
      session.put('ally_error', 'Ocorreu um erro ao fazer login')
      return response.redirect().toRoute('auth.login.create')
    }

    const googleUser = await allyInstance.user()
    const userByEmail = await User.query().where('email', googleUser.email!).whereNull('google_id').first()

    if (userByEmail) {
      session.put('ally_error', 'Usuário já cadastrado e o login não pode proceder sem vincular o perfil do Google')
      return response.redirect().toRoute('auth.login.create')
    }

    const user = await User.firstOrNew(
      { googleId: googleUser.id },
      {
        email: googleUser.email!,
        googleId: googleUser.id,
        password: generatePassword(12),
        username: googleUser.name,
        emailVerifiedAt: googleUser.emailVerificationState === 'verified' ? DateTime.now() : null,
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
