import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import Application from '@ioc:Adonis/Core/Application'
import Env from '@ioc:Adonis/Core/Env'
import Route from '@ioc:Adonis/Core/Route'
import View from '@ioc:Adonis/Core/View'
import mjml from 'mjml'
import User from 'App/Models/User'

export default class VerifyEmail extends BaseMailer {
  constructor(private readonly user: User) {
    super()
  }

  public async prepare(message: MessageContract) {
    const link = Route.makeSignedUrl(
      'users.verifyEmail',
      { email: this.user.email },
      { expiresIn: '15m', httpOnly: true, prefixUrl: Env.get('FRONTEND_URL') },
    )

    const rendered = await View.render('emails/verify_email', { username: this.user.username, link })
    const { html } = mjml(rendered)

    message.embed(Application.publicPath('images/mail/verify-email.png'), 'verify-mail-image')
    message.html(html)
    message.subject('Verifique seu e-mail')
    message.from('no-reply@controle.dev.br')
    message.to(this.user.email)
  }
}
