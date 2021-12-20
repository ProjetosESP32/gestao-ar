import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import Env from '@ioc:Adonis/Core/Env'
import Route from '@ioc:Adonis/Core/Route'
import View from '@ioc:Adonis/Core/View'
import User from 'App/Models/User'
import mjml from 'mjml'

export default class Welcome extends BaseMailer {
  constructor(private readonly user: User) {
    super()
  }

  public async prepare(message: MessageContract) {
    const link = Route.makeSignedUrl(
      'user.verifyEmail',
      { email: this.user.email },
      { expiresIn: '15m', httpOnly: true, prefixUrl: Env.get('FRONTEND_URL') }
    )

    const rendered = await View.render('emails/welcome', { username: this.user.username, link })
    const { html } = mjml(rendered)

    message.subject('Bem vindo ao Gestão Ar').from('no-reply@gestaoar.com.br').to(this.user.email).html(html)
  }
}
