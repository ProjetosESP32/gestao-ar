import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class ResetPasswordValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    password: schema.string({}, [rules.minLength(6), rules.maxLength(16), rules.confirmed('passwordConfirmation')]),
  })

  public messages = {
    'password.required': 'O campo senha é obrigatório',
    'password.minLength': 'A senha deve ter no mínimo 6 caracteres',
    'password.maxLength': 'A senha deve ter no máximo 16 caracteres',
    'password.confirmation': 'As senhas não conferem',
  }
}
