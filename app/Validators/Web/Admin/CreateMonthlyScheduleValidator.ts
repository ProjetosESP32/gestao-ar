import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateMonthlyScheduleValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    daysOfWeek: schema.array
      .optional([rules.requiredIfNotExists('daysOfMonth')])
      .members(schema.number([rules.range(1, 7)])),
    daysOfMonth: schema.array
      .optional([rules.requiredIfNotExists('daysOfWeek'), rules.requiredIfNotExists('weekNumber')])
      .members(schema.number([rules.range(1, 31)])),
    weekNumber: schema.number.optional([rules.requiredIfNotExists('daysOfMonth'), rules.range(1, 7)]),
  })

  public messages: CustomMessages = {
    'daysOfWeek.required': 'Os dias da semana são obrigatórios',
    'daysOfWeek.array': 'Os dias da semana devem ser um array',
    'daysOfWeek.*.number': 'Os dias do mês devem ser números',
    'daysOfWeek.*.range': 'Os dias do mês devem ser números entre 1 e 31',
    'daysOfMonth.required': 'Os dias do mês são obrigatórios',
    'daysOfMonth.array': 'Os dias do mês devem ser um array',
    'daysOfMonth.*.number': 'Os dias do mês devem ser números',
    'daysOfMonth.*.range': 'Os dias do mês devem ser números entre 1 e 31',
    'weekNumber.required': 'O número da semana é obrigatório',
    'weekNumber.number': 'O número da semana deve ser um número',
    'weekNumber.range': 'O número da semana deve ser entre 1 e 7',
  }
}
