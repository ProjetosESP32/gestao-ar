import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import Env from '@ioc:Adonis/Core/Env'
import Route from '@ioc:Adonis/Core/Route'
import View from '@ioc:Adonis/Core/View'
import mjml from 'mjml'
import User from 'App/Models/User'

export default class RecoverPassword extends BaseMailer {
  constructor(private readonly user: User) {
    super()
  }

  public async prepare(message: MessageContract) {
    const link = Route.makeSignedUrl(
      'users.changePassword',
      { email: this.user.email },
      { expiresIn: '2m', httpOnly: true, prefixUrl: Env.get('FRONTEND_URL') },
    )

    const rendered = await View.render('emails/recover_password', { username: this.user.username, link })
    const { html } = mjml(rendered)

    message.subject('Recuperação de senha').from('no-reply@gestaoar.com.br').to(this.user.email).html(html)
  }
}
