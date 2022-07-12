import { DateTime } from 'luxon'

export const dateTimeValueFormatter = (value: string) =>
  DateTime.fromISO(value).toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)
