import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class UpdateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    username: schema.string.optional({ trim: true }, [rules.unique({ table: 'users', column: 'username' })]),
    email: schema.string.optional({}, [
      rules.email(),
      rules.unique({ table: 'users', column: 'email', whereNot: { id: this.ctx.auth.user!.id } }),
    ]),
  })

  public messages = {
    'username.unique': 'O nome de usuário já está em uso',
    'email.unique': 'O email já está em uso',
    'email.email': 'O email informado não é válido',
  }
}
