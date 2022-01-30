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

  public messages = {}
}
