import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import Logger from '@ioc:Adonis/Core/Logger'

export default class ExceptionHandler extends HttpExceptionHandler {
  protected statusPages = {
    '403': 'errors/403',
    '404': 'errors/404',
    '500..599': 'errors/500',
  }

  constructor() {
    super(Logger)
  }

  public async handle(error: unknown, context: HttpContextContract) {
    context.session.flash('alert', {
      severity: 'error',
      message: 'Ocorreu um erro',
    })

    return super.handle(error, context)
  }
}
