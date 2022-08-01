import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class TemperatureValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    temperature: schema.number([rules.range(17, 27)]),
  })

  public messages = {
    'temperature.range': 'A temperatura deve estar entre 17 e 27 graus.',
    'temperature.required': 'A temperatura é obrigatória.',
  }
}
