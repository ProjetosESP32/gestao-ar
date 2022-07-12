import { GridValueFormatterParams } from '@mui/x-data-grid'
import { dateTimeValueFormatter } from './dateTimeValueFormatter'

export const dateTimeGridValueFormatter = (params: GridValueFormatterParams<string>) =>
  dateTimeValueFormatter(params.value)
