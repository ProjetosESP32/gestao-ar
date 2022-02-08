import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import Route from '@ioc:Adonis/Core/Route'
import Env from '@ioc:Adonis/Core/Env'
import User from 'App/Models/User'
import View from '@ioc:Adonis/Core/View'
import mjml from 'mjml'

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

    message.subject('Criação de Conta').from('no-reply@gestaoar.com.br').to(this.user.email).html(html)
  }
}
