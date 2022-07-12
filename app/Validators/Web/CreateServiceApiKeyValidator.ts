import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class CreateServiceApiKeyValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }, [rules.unique({ table: 'services', column: 'name' })]),
  })

  public messages = {
    'name.required': 'Nome é obrigatório',
    'name.unique': 'Nome já existe',
  }
}
