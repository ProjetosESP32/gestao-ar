import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class UpdateServiceApiKeyValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string.optional({ trim: true }, [rules.unique({ table: 'services', column: 'name' })]),
  })

  public messages = {
    'name.alpha': 'Nome deve conter apenas letras',
    'name.unique': 'Nome já existe',
  }
}
