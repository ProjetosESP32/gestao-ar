import { validator } from '@ioc:Adonis/Core/Validator'
import { DateTime } from 'luxon'

validator.rule('timezone', (value, _, options) => {
  if (typeof value !== 'string') {
    return
  }

  const date = DateTime.now().setZone(value)

  if (!date.isValid) {
    options.errorReporter.report(options.pointer, 'timezone', 'timezone not valid', options.arrayExpressionPointer)
  }
})
