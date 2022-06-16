import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class UpdateServiceApiKeyValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string.optional({ trim: true }, [rules.alpha(), rules.unique({ table: 'services', column: 'name' })]),
    description: schema.string.optional({ trim: true }, [rules.alpha(), rules.maxLength(255)]),
  })

  public messages = {
    'name.alpha': 'Nome deve conter apenas letras',
    'name.unique': 'Nome já existe',
    'description.alpha': 'Descrição deve conter apenas letras',
    'description.maxLength': 'Descrição deve conter no máximo 255 caracteres',
  }
}
