import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class UpdatePasswordValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    oldPassword: schema.string(),
    newPassword: schema.string({}, [
      rules.minLength(6),
      rules.maxLength(16),
      rules.confirmed('newPasswordConfirmation'),
    ]),
  })

  public messages = {
    'newPasswordConfirmation.confirmed': 'A confirmação da nova senha não confere',
    'newPassword.minLength': 'A senha deve ter no mínimo 6 caracteres',
    'newPassword.maxLength': 'A senha deve ter no máximo 16 caracteres',
    'newPassword.required': 'A nova senha é obrigatória',
    'oldPassword.required': 'A senha antiga é obrigatória',
  }
}
