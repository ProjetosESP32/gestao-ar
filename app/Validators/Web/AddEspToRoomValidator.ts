import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class AddEspToRoomValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    espMac: schema.string({ trim: true }, [
      rules.exists({ column: 'mac_address', table: 'esps', where: { deleted_at: null } }),
      rules.regex(/[0-9a-fA-F]{12}/g),
    ]),
  })

  public messages = {
    'espMac.required': 'O campo MAC é obrigatório',
    'espMac.exists': 'O esp com esse endereço MAC não existe',
    'espMac.regex': 'O endereço MAC deve ser um MAC válido',
  }
}
