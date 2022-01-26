import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class RecoverPasswordValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({ trim: true }, [rules.email(), rules.exists({ table: 'users', column: 'email' })]),
  })

  public messages = {
    'email.required': 'O campo e-mail é obrigatório',
    'email.email': 'O campo e-mail deve ser um e-mail válido',
    'email.exists': 'Este e-mail não está cadastrado',
  }
}
