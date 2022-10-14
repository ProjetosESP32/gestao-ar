import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ScheduleRepeat } from 'App/Enums/ScheduleRepeat'

export default class CreateBaseScheduleValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }, [rules.maxLength(55), rules.alpha({ allow: ['space'] })]),
    scheduleDate: schema.date({}, [rules.afterOrEqual('today')]),
    repeat: schema.enum(Object.values(ScheduleRepeat)),
    isAllDay: schema.boolean.optional(),
    startTime: schema.date.optional({ format: 'HH:mm' }, [
      rules.requiredWhen('isAllDay', '=', false),
      rules.requiredIfNotExists('isAllDay'),
    ]),
    endTime: schema.date.optional({ format: 'HH:mm' }, [
      rules.requiredWhen('isAllDay', '=', false),
      rules.requiredIfNotExists('isAllDay'),
    ]),
    repeatInterval: schema.number.optional([rules.requiredWhen('repeat', '!=', ScheduleRepeat.ONCE)]),
    activeUntil: schema.date.optional({}, [
      rules.requiredWhen('repeat', '!=', ScheduleRepeat.ONCE),
      rules.after('today'),
    ]),
    timezone: schema.string({}, [rules.timezone()]),
  })

  public messages: CustomMessages = {
    'name.required': 'O nome é obrigatório',
    'name.maxLength': 'O nome deve ter no máximo 55 caracteres',
    'name.alpha': 'O nome deve conter apenas letras',
    'scheduleDate.required': 'A data é obrigatória',
    'scheduleDate.afterOrEqual': 'A data deve ser maior ou igual a hoje',
    'startTime.required': 'A hora de início é obrigatória',
    'startTime.date': 'A hora de início deve ser uma hora válida',
    'endTime.required': 'A hora de fim é obrigatória',
    'endTime.date': 'A hora de fim deve ser uma hora válida',
    'isAllDay.boolean': 'O dia todo deve ser um booleano',
    'repeat.required': 'O tipo de repetição é obrigatório',
    'repeat.enum': 'O tipo de repetição deve ser um dos seguintes: {{ options.choices }}',
    'repeatInterval.required': 'O intervalo de repetição é obrigatório',
    'repeatInterval.number': 'O intervalo deve ser um número',
    'activeUntil.required': 'A data de final da ativação é obrigatória',
    'activeUntil.after': 'A data de final da ativação deve ser maior que hoje',
    'activeUntil.date': 'A data de final da ativação deve ser uma data válida',
    'timezone.timezone': 'Fuso horário inválido',
  }
}
