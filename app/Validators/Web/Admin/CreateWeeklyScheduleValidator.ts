import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateWeeklyScheduleValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    daysOfWeek: schema.array().members(schema.number([rules.range(1, 7)])),
  })

  public messages: CustomMessages = {
    'daysOfWeek.required': 'Os dias da semana são obrigatórios',
    'daysOfWeek.array': 'Os dias da semana devem ser um array',
    'daysOfWeek.*.number': 'Os dias do mês devem ser números',
    'daysOfWeek.*.range': 'Os dias do mês devem ser números entre 1 e 31',
  }
}
