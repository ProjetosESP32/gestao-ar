import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { DateTime } from 'luxon'
import Welcome from 'App/Mailers/Welcome'
import User from 'App/Models/User'
import { generatePassword } from 'App/Utils/generatePassword'

export default class GoogleAuthController {
  public async create({ ally }: HttpContextContract) {
    return ally.use('google').redirect()
  }

  public async store({ ally, auth, response, session }: HttpContextContract) {
    const allyInstance = ally.use('google')

    if (allyInstance.hasError() || allyInstance.stateMisMatch()) {
      session.put('ally_error', 'Ocorreu um erro ao fazer login')
      return response.redirect().toRoute('login.create')
    }

    const googleUser = await allyInstance.user()

    const user = await User.firstOrCreate(
      { googleId: googleUser.id },
      {
        email: googleUser.email!,
        googleId: googleUser.id,
        password: generatePassword(12),
        username: googleUser.name,
        emailVerifiedAt: googleUser.emailVerificationState === 'verified' ? DateTime.now() : null,
      },
    )

    if (!user.emailVerifiedAt) {
      await new Welcome(user).sendLater()
    }

    await auth.use('web').login(user)

    return response.redirect().toRoute('home')
  }
}
