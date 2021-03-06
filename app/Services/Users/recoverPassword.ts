import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RecoverPassword from 'App/Mailers/RecoverPassword'
import User from 'App/Models/User'
import RecoverPasswordValidator from 'App/Validators/RecoverPasswordValidator'

export const recoverPassword = async ({ request, session }: HttpContextContract) => {
  const { email } = await request.validate(RecoverPasswordValidator)
  const user = await User.findBy('email', email)

  await new RecoverPassword(user!).sendLater()

  session.flash('alert', {
    severity: 'success',
    message: 'Um e-mail foi enviado para você com instruções para recuperar sua senha',
  })
}
