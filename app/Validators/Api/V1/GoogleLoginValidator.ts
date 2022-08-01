import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'

export default class GoogleLoginValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    token: schema.string(),
    vinculate: schema.boolean.optional(),
  })

  public messages: CustomMessages = {
    'token.required': 'Token é obrigatório',
    'token.string': 'Token deve ser uma string',
  }
}
