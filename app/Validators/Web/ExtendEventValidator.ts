import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class ExtendEventValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    amountOfTime: schema.number([rules.range(5, 60)]),
  })

  public messages = {
    'amountOfTime.range': 'O tempo deve ser entre 5 e 60 minutos',
    'amountOfTime.required': 'O tempo é obrigatório',
    'amountOfTime.number': 'O tempo deve ser um número',
  }
}
