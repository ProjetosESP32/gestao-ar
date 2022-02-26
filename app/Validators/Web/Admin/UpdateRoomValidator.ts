import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'

export default class UpdateRoomValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string.optional({ trim: true }, [
      rules.maxLength(25),
      rules.unique({ column: 'name', table: 'rooms' }),
    ]),
    block: schema.string.optional({ trim: true }, [rules.maxLength(10)]),
    floor: schema.string.optional({ trim: true }, [rules.maxLength(10)]),
  })

  public messages = {
    'name.required': 'O nome da sala é obrigatório',
    'name.maxLength': 'O nome da sala deve ter no máximo 25 caracteres',
    'name.unique': 'Já existe uma sala com este nome',
    'block.required': 'O bloco da sala é obrigatório',
    'block.maxLength': 'O bloco da sala deve ter no máximo 10 caracteres',
    'floor.required': 'O andar da sala é obrigatório',
    'floor.maxLength': 'O andar da sala deve ter no máximo 10 caracteres',
  }
}
