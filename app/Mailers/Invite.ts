import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import Application from '@ioc:Adonis/Core/Application'
import Env from '@ioc:Adonis/Core/Env'
import Route from '@ioc:Adonis/Core/Route'
import View from '@ioc:Adonis/Core/View'
import mjml from 'mjml'
import User from 'App/Models/User'

export default class Invite extends BaseMailer {
  constructor(private readonly user: User) {
    super()
  }

  public async prepare(message: MessageContract) {
    const link = Route.makeSignedUrl(
      'users.changePassword',
      { email: this.user.email },
      { expiresIn: '15m', httpOnly: true, prefixUrl: Env.get('FRONTEND_URL') },
    )

    const rendered = await View.render('emails/invite', {
      username: this.user.username,
      link,
    })
    const { html } = mjml(rendered)

    message.embed(Application.publicPath('images/mail/new-password.png'), 'new-password-mail-image')
    message.html(html)
    message.subject('Criação de conta')
    message.from('no-reply@controle.dev.br')
    message.to(this.user.email)
  }
}
