import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Exception } from '@poppinss/utils'
import { DateTime } from 'luxon'
import Welcome from 'App/Mailers/Welcome'
import User from 'App/Models/User'
import { generatePassword } from 'App/Utils/generatePassword'
import { getAttachment } from 'App/Utils/getAttachment'
import GoogleLoginValidator from 'App/Validators/Api/V1/GoogleLoginValidator'

export default class GoogleAuthController {
  public async store({ ally, auth, request }: HttpContextContract) {
    const allyInstance = ally.use('google')

    if (allyInstance.hasError()) {
      throw new Exception('There was an error logging in with Google', 400, 'E_GOOGLE_LOGIN')
    }

    const { token, vinculate } = await request.validate(GoogleLoginValidator)
    const googleUser = await allyInstance.userFromToken(token)
    const authUser = auth.use('api').user

    if (vinculate && !authUser) {
      throw new Exception('Não é possível vincular conta Google a uma conta que não está logada', 400, 'E_GOOGLE_LOGIN')
    }

    if (!vinculate && authUser) {
      throw new Exception('Não é possível vincular conta Google', 400, 'E_GOOGLE_LOGIN')
    }

    if (vinculate && authUser) {
      authUser.googleId = googleUser.id
      await authUser.save()

      return authUser
    }

    const userByEmail = await User.query().where('email', googleUser.email!).whereNull('google_id').first()

    if (userByEmail) {
      throw new Exception('Não é possível fazer login com o Google', 400, 'E_GOOGLE_LOGIN')
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

    const apiToken = await auth.use('api').login(user, { expiresIn: '1 week' })

    return { user, token: apiToken }
  }
}
