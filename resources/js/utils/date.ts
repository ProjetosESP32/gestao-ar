import { GridValueFormatterParams } from '@mui/x-data-grid'
import { DateTime } from 'luxon'

export const dateTimeValueFormatter = (value: string) =>
  DateTime.fromISO(value).toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)

export const dateTimeGridValueFormatter = (params: GridValueFormatterParams<string>) =>
  dateTimeValueFormatter(params.value)

export const getMonthsByNumber = (num: number) =>
  [
    'JANEIRO',
    'FEVEREIRO',
    'MARÇO',
    'ABRIL',
    'MAIO',
    'JUNHO',
    'JULHO',
    'AGOSTO',
    'SETEMBRO',
    'OUTUBRO',
    'NOVEMBRO',
    'DEZEMBRO',
  ][num]
