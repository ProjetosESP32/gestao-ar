import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    username: schema.string({ trim: true }, [rules.unique({ table: 'users', column: 'username' })]),
    email: schema.string({}, [rules.email(), rules.unique({ table: 'users', column: 'email' })]),
    password: schema.string({}, [rules.minLength(6), rules.maxLength(16), rules.confirmed('passwordConfirmation')]),
  })

  public messages = {
    'username.required': 'O campo nome de usuário é obrigatório',
    'username.unique': 'Nome de usuário já usado.',
    'email.required': 'O campo email é obrigatório',
    'email.unique': 'Email já usado.',
    'email.email': 'Email inválido.',
    'password.required': 'O campo senha é obrigatório',
    'password.minLength': 'A senha deve ter no mínimo 6 caracteres.',
    'password.maxLength': 'A senha deve ter no máximo 16 caracteres.',
    'password.confirmed': 'As senhas não conferem.',
  }
}
