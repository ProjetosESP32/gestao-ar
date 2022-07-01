import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class CreateEventScheduleValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }, [rules.minLength(10), rules.maxLength(55), rules.alpha({ allow: ['space'] })]),
    description: schema.string({ trim: true }, [rules.minLength(10), rules.maxLength(255)]),
    startDate: schema.date(),
    endDate: schema.date({}, [rules.afterField('startDate'), rules.after('today')]),
    recurrences: schema.array().members(
      schema.object().members({
        daysOfWeek: schema.array().members(schema.number([rules.range(1, 7)])),
        daysOfMonth: schema.array().members(schema.number([rules.range(1, 31)])),
        startTime: schema.date({ format: 'HH:mm' }),
        endTime: schema.date({ format: 'HH:mm' }, [rules.afterField('startTime')]),
      }),
    ),
  })

  public messages = {
    'name.required': 'O nome é obrigatório',
    'name.minLength': 'O nome deve ter no mínimo 10 caracteres',
    'name.maxLength': 'O nome deve ter no máximo 55 caracteres',
    'name.alpha': 'O nome deve conter apenas letras',
    'description.minLength': 'A descrição deve ter no mínimo 10 caracteres',
    'description.maxLength': 'A descrição deve ter no máximo 255 caracteres',
    'startDate.required': 'A data de início é obrigatória',
    'endDate.required': 'A data de fim é obrigatória',
    'endDate.after': 'A data de fim deve ser posterior a data de hoje',
    'endDate.afterField': 'A data de fim deve ser posterior a data de início',
    'recurrences.required': 'As recorrências são obrigatórias',
    'recurrences.array': 'As recorrências devem ser um array',
    'recurrences.*.daysOfWeek.required': 'Os dias da semana são obrigatórios',
    'recurrences.*.daysOfWeek.array': 'Os dias da semana devem ser um array',
    'recurrences.*.daysOfWeek.*.number': 'Os dias da semana devem ser números',
    'recurrences.*.daysOfWeek.*.range': 'Os dias da semana devem estar entre 1 e 7',
    'recurrences.*.daysOfMonth.required': 'Os dias do mês são obrigatórios',
    'recurrences.*.daysOfMonth.array': 'Os dias do mês devem ser um array',
    'recurrences.*.daysOfMonth.*.number': 'Os dias do mês devem ser números',
    'recurrences.*.daysOfMonth.*.range': 'Os dias do mês devem estar entre 1 e 31',
    'recurrences.*.startTime.required': 'A hora de início é obrigatória',
    'recurrences.*.startTime.date': 'A hora de início deve ser uma data',
    'recurrences.*.startTime.format': 'A hora de início deve estar no formato HH:mm',
    'recurrences.*.endTime.required': 'A hora de fim é obrigatória',
    'recurrences.*.endTime.date': 'A hora de fim deve ser uma data',
    'recurrences.*.endTime.format': 'A hora de fim deve estar no formato HH:mm',
    'recurrences.*.endTime.after': 'A hora de fim deve ser posterior a hora de início',
    'recurrences.*.endTime.afterField': 'A hora de fim deve ser posterior a hora de início',
  }
}
