import { ScheduleRepeat } from '@/enums/ScheduleRepeat'
import { Inertia } from '@inertiajs/inertia'
import Button from '@mui/material/Button'
import Collapse from '@mui/material/Collapse'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Stack from '@mui/material/Stack'
import Switch from '@mui/material/Switch'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import { DatePicker, DateTimePicker, TimePicker } from '@mui/x-date-pickers'
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTime } from 'luxon'
import React, { FC, FormEvent, useState } from 'react'
import { ScheduleMonthSelect } from './ScheduleMonthSelect'
import { ScheduleWeekSelect } from './ScheduleWeekSelect'

interface CreateScheduleFormData {
  name: string
  scheduleDate: DateTime
  startTime?: DateTime
  endTime?: DateTime
  isAllDay?: boolean
  repeat: string
  repeatInterval: number
  daysOfWeek?: number[]
  daysOfMonth?: number[]
  weekNumber?: number
  activeUntil: DateTime
  timezone: string
}

interface CreateScheduleFormProps {
  roomId: number
}

export const CreateScheduleForm: FC<CreateScheduleFormProps> = ({ roomId }) => {
  const [processing, setProcessing] = useState(false)
  const [data, setData] = useState<CreateScheduleFormData>({
    name: '',
    repeat: ScheduleRepeat.ONCE,
    repeatInterval: 1,
    activeUntil: DateTime.now().set({ second: 0 }),
    scheduleDate: DateTime.now(),
    isAllDay: false,
    weekNumber: 1,
    startTime: DateTime.now(),
    endTime: DateTime.now(),
    daysOfWeek: [],
    daysOfMonth: [],
    timezone: DateTime.now().zoneName,
  })
  const [monthRepeatType, setMonthRepeatType] = useState('days')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const transformedData = {
      ...data,
      scheduleDate: data.scheduleDate.toISO(),
      startTime: data.startTime?.toFormat('HH:mm'),
      endTime: data.endTime?.toFormat('HH:mm'),
      activeUntil: data.repeat === ScheduleRepeat.ONCE ? null : data.activeUntil.toISO(),
    }

    Inertia.post(`/admin/rooms/${roomId}/schedules`, transformedData as any, {
      onBefore: () => setProcessing(true),
      onFinish: () => setProcessing(false),
    })
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setData({ ...data, [name]: value })
  }

  const handleSwitchChange = (_: unknown, checked: boolean) => {
    setData({ ...data, isAllDay: checked })
  }

  const handleRadioChange = (_: unknown, value: string) => {
    setData({ ...data, repeat: value, daysOfMonth: [], daysOfWeek: [] })
  }

  const makeHandleChangeDate = (name: keyof CreateScheduleFormData) => (date: DateTime | null) => {
    date && setData({ ...data, [name]: date })
  }

  return (
    <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale='pt-br'>
      <Stack direction='column' component='form' spacing={2} onSubmit={handleSubmit}>
        <TextField
          fullWidth
          id='name'
          name='name'
          label='Nome do horário'
          variant='outlined'
          placeholder='Digite o nome do horário'
          type='text'
          value={data.name}
          onChange={handleChange}
          disabled={processing}
        />
        <DatePicker
          value={data.scheduleDate}
          label='Data'
          renderInput={BasicTextField}
          onChange={makeHandleChangeDate('scheduleDate')}
          disabled={processing}
        />
        <FormControl sx={{ alignSelf: 'end' }}>
          <FormControlLabel
            control={
              <Switch
                id='power'
                name='power'
                checked={data.isAllDay}
                onChange={handleSwitchChange}
                disabled={processing}
              />
            }
            label='Dia inteiro'
          />
        </FormControl>

        <Collapse in={!data.isAllDay}>
          <Stack direction='row' spacing={2}>
            <TimePicker
              label='Horário de início'
              value={data.startTime}
              onChange={makeHandleChangeDate('startTime')}
              renderInput={BasicTextField}
              disabled={processing}
            />
            <TimePicker
              label='Horário de fim'
              value={data.endTime}
              onChange={makeHandleChangeDate('endTime')}
              renderInput={BasicTextField}
              disabled={processing}
            />
          </Stack>
        </Collapse>

        <FormControl>
          <FormLabel>Repetir</FormLabel>
          <RadioGroup defaultValue={ScheduleRepeat.ONCE} onChange={handleRadioChange}>
            {Object.values(ScheduleRepeat).map(value => (
              <FormControlLabel key={value} value={value} control={<Radio />} label={getLabelByScheduleRepeat(value)} />
            ))}
          </RadioGroup>
        </FormControl>

        <Collapse in={data.repeat !== ScheduleRepeat.ONCE}>
          <Stack direction='column' spacing={2}>
            <TextField
              fullWidth
              id='repeatInterval'
              name='repeatInterval'
              label='Intervalo de repetição'
              variant='outlined'
              placeholder='Digite o intervalo de tempo'
              type='number'
              value={data.repeatInterval}
              onChange={handleChange}
              disabled={processing}
            />

            {data.repeat === ScheduleRepeat.WEEKLY && (
              <ScheduleWeekSelect
                id='schedule-week'
                label='Selecione os dias da semana'
                onChange={daysOfWeek => setData({ ...data, daysOfWeek, daysOfMonth: [] })}
                values={data.daysOfWeek ?? []}
              />
            )}

            {data.repeat === ScheduleRepeat.MONTHLY && (
              <>
                <FormControl>
                  <FormLabel>Por:</FormLabel>
                  <RadioGroup defaultValue='days' onChange={(_, val) => setMonthRepeatType(val)} row>
                    <FormControlLabel value='days' control={<Radio />} label='Dias' />
                    <FormControlLabel value='week_day' control={<Radio />} label='Semana e dia da semana' />
                  </RadioGroup>
                </FormControl>
                {monthRepeatType === 'days' ? (
                  <ScheduleMonthSelect
                    id='schedule-month'
                    label='Selecione os dias do mês'
                    values={data.daysOfMonth ?? []}
                    onChange={daysOfMonth => setData({ ...data, daysOfWeek: [], daysOfMonth })}
                  />
                ) : (
                  <>
                    <TextField
                      fullWidth
                      id='weekNumber'
                      name='weekNumber'
                      label='Semana do mês'
                      variant='outlined'
                      placeholder='Digite a semana do mês'
                      type='number'
                      helperText='De 1 a 5, Ex: 1° semana do mês'
                      inputMode='numeric'
                      inputProps={{ pattern: '[1-5]' }}
                      value={data.weekNumber}
                      onChange={handleChange}
                      disabled={processing}
                    />
                    <ScheduleWeekSelect
                      id='month-schedule-week'
                      label='Selecione os dias da semana'
                      onChange={daysOfWeek => setData({ ...data, daysOfWeek, daysOfMonth: [] })}
                      values={data.daysOfWeek ?? []}
                    />
                  </>
                )}
              </>
            )}

            <DateTimePicker
              label='Ativo até'
              value={data.activeUntil}
              onChange={makeHandleChangeDate('activeUntil')}
              renderInput={BasicTextField}
              disabled={processing}
            />
          </Stack>
        </Collapse>

        <Button variant='contained' type='submit' disabled={processing}>
          Salvar
        </Button>
      </Stack>
    </LocalizationProvider>
  )
}

const BasicTextField = (props: TextFieldProps) => <TextField {...props} variant='outlined' fullWidth />

const getLabelByScheduleRepeat = (repeat: ScheduleRepeat) =>
  ({
    [ScheduleRepeat.ONCE]: 'Não repetir',
    [ScheduleRepeat.DAILY]: 'Diariamente',
    [ScheduleRepeat.WEEKLY]: 'Semanalmente',
    [ScheduleRepeat.MONTHLY]: 'Mensalmente',
    [ScheduleRepeat.YEARLY]: 'Anualmente',
  }[repeat])
