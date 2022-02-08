import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    username: schema.string({ trim: true }, [rules.unique({ table: 'users', column: 'username' })]),
    email: schema.string({}, [rules.email(), rules.unique({ table: 'users', column: 'email' })]),
  })

  public messages = {
    'username.required': 'O campo nome de usuário é obrigatório',
    'username.unique': 'Este nome de usuário já está em uso',
    'email.required': 'O campo email é obrigatório',
    'email.email': 'O campo email deve ser um email válido',
    'email.unique': 'Este email já está em uso',
  }
}
