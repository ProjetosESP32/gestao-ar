import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateExceptionValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    exceptionDate: schema.date({}, [rules.afterOrEqual('today')]),
  })

  public messages: CustomMessages = {
    'exceptionDate.required': 'A data é obrigatória',
    'exceptionDate.afterOrEqual': 'A data deve ser maior ou igual a hoje',
  }
}
