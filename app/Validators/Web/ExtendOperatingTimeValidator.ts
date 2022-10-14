import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ExtendOperatingTimeValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    amountOfTime: schema.number([rules.range(5, 60)]),
  })

  public messages: CustomMessages = {
    'amountOfTime.range': 'O tempo deve estar entre 5 e 60 minutos',
  }
}
