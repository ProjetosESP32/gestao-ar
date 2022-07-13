import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'

export default class UpdateEspValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string.optional({ trim: true }, [rules.maxLength(25)]),
    roomId: schema.number.optional([rules.exists({ table: 'rooms', column: 'id' })]),
  })

  public messages: CustomMessages = {
    'name.maxLength': 'O nome deve ter no máximo 25 caracteres',
    'name.string': 'O nome deve ser uma string',
    'roomId.exists': 'A sala não existe',
  }
}
