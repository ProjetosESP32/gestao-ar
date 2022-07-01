import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class UpdateEventScheduleValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string.optional({ trim: true }, [
      rules.minLength(10),
      rules.maxLength(55),
      rules.alpha({ allow: ['space'] }),
    ]),
    description: schema.string.optional({ trim: true }, [rules.minLength(10), rules.maxLength(255)]),
    startDate: schema.date.optional(),
    endDate: schema.date.optional({}, [rules.afterField('startDate'), rules.after('today')]),
    recurrences: schema.array.optional().members(
      schema.object().members({
        daysOfWeek: schema.array.optional().members(schema.number([rules.range(1, 7)])),
        daysOfMonth: schema.array.optional().members(schema.number([rules.range(1, 31)])),
        startTime: schema.date.optional({ format: 'HH:mm' }),
        endTime: schema.date.optional({ format: 'HH:mm' }, [rules.afterField('startTime')]),
      }),
    ),
  })

  public messages = {
    'name.minLength': 'O nome deve ter no mínimo 10 caracteres',
    'name.maxLength': 'O nome deve ter no máximo 55 caracteres',
    'name.alpha': 'O nome deve conter apenas letras',
    'description.minLength': 'A descrição deve ter no mínimo 10 caracteres',
    'description.maxLength': 'A descrição deve ter no máximo 255 caracteres',
    'endDate.after': 'A data de fim deve ser posterior a data de hoje',
    'endDate.afterField': 'A data de fim deve ser posterior a data de início',
    'recurrences.array': 'As recorrências devem ser um array',
    'recurrences.*.daysOfWeek.array': 'Os dias da semana devem ser um array',
    'recurrences.*.daysOfWeek.*.number': 'Os dias da semana devem ser números',
    'recurrences.*.daysOfWeek.*.range': 'Os dias da semana devem estar entre 1 e 7',
    'recurrences.*.daysOfMonth.array': 'Os dias do mês devem ser um array',
    'recurrences.*.daysOfMonth.*.number': 'Os dias do mês devem ser números',
    'recurrences.*.daysOfMonth.*.range': 'Os dias do mês devem estar entre 1 e 31',
    'recurrences.*.startTime.date': 'A hora de início deve ser uma data',
    'recurrences.*.startTime.format': 'A hora de início deve estar no formato HH:mm',
    'recurrences.*.endTime.date': 'A hora de fim deve ser uma data',
    'recurrences.*.endTime.format': 'A hora de fim deve estar no formato HH:mm',
    'recurrences.*.endTime.after': 'A hora de fim deve ser posterior a hora de início',
    'recurrences.*.endTime.afterField': 'A hora de fim deve ser posterior a hora de início',
  }
}
