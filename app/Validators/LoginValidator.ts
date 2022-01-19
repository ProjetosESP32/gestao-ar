import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class LoginValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({}, [rules.email(), rules.exists({ table: 'users', column: 'email' })]),
    password: schema.string({}, [rules.minLength(6), rules.maxLength(16)]),
    rememberMe: schema.boolean(),
  })

  public messages = {
    'email.required': 'O campo email é obrigatório',
    'email.email': 'O campo email deve ser um email válido',
    'email.exists': 'Este email não está cadastrado',
    'password.required': 'O campo senha é obrigatório',
    'password.minLength': 'A senha deve ter no mínimo 6 caracteres',
    'password.maxLength': 'A senha deve ter no máximo 16 caracteres',
    'rememberMe.boolean': 'O campo lembrar-me deve ser um booleano',
  }
}
