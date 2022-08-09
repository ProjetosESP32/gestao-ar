import { Inertia } from '@inertiajs/inertia'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { DatePicker, TimePicker } from '@mui/x-date-pickers'
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTime } from 'luxon'
import React, { FC, FormEvent, Fragment, useState } from 'react'
import { MdDelete } from 'react-icons/md'
import { ScheduleMonthSelect } from './ScheduleMonthSelect'
import { ScheduleWeekSelect } from './ScheduleWeekSelect'

interface Recurrence {
  daysOfWeek: number[]
  daysOfMonth: number[]
  startTime: DateTime
  endTime: DateTime
  recurrentBy: 'week' | 'month'
}

interface CreateScheduleFormData {
  name: string
  description: string
  startDate: DateTime
  endDate: DateTime
  recurrences: Recurrence[]
}

interface CreateScheduleFormProps {
  roomId: number
}

export const CreateScheduleForm: FC<CreateScheduleFormProps> = ({ roomId }) => {
  const [processing, setProcessing] = useState(false)
  const [data, setData] = useState<CreateScheduleFormData>({
    name: '',
    description: '',
    startDate: DateTime.now(),
    endDate: DateTime.now(),
    recurrences: [
      {
        daysOfMonth: [],
        daysOfWeek: [],
        startTime: DateTime.now(),
        endTime: DateTime.now(),
        recurrentBy: 'week',
      },
    ],
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const transformedData = {
      ...data,
      startDate: data.startDate.toISO(),
      endDate: data.endDate.toISO(),
      recurrences: data.recurrences.map(({ startTime, endTime, recurrentBy: _, ...recurrence }) => ({
        ...recurrence,
        startTime: startTime.toFormat('HH:mm'),
        endTime: endTime.toFormat('HH:mm'),
      })),
    }

    Inertia.post(`/admin/rooms/${roomId}/schedules`, transformedData as any, {
      onBefore: () => setProcessing(true),
      onFinish: () => setProcessing(false),
      onError: console.log,
    })
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setData({ ...data, [name]: value })
  }

  const makeHandleChangeDate = (name: keyof CreateScheduleFormData) => (date: DateTime | null) => {
    date && setData({ ...data, [name]: date })
  }

  const makeRecurrenceHandleChange = (name: keyof Recurrence, idx: number) => (value: unknown) => {
    if (value) {
      setData({
        ...data,
        recurrences: data.recurrences.map((recurrence, index) =>
          index === idx ? { ...recurrence, [name]: value } : recurrence,
        ),
      })
    }
  }

  const makeRecurrenceByHandle = (idx: number) => (e: SelectChangeEvent<Recurrence['recurrentBy']>) => {
    const value = e.target.value as Recurrence['recurrentBy']

    setData({
      ...data,
      recurrences: data.recurrences.map((recurrence, index) =>
        index === idx
          ? {
              ...recurrence,
              daysOfMonth: value === 'month' ? recurrence.daysOfMonth : [],
              daysOfWeek: value === 'week' ? recurrence.daysOfWeek : [],
              recurrentBy: value,
            }
          : recurrence,
      ),
    })
  }

  const addRecurrence = () => {
    setData({
      ...data,
      recurrences: [
        ...data.recurrences,
        {
          daysOfMonth: [],
          daysOfWeek: [],
          startTime: DateTime.now(),
          endTime: DateTime.now(),
          recurrentBy: 'week',
        },
      ],
    })
  }

  const makeRemoveRecurrence = (index: number) => () => {
    setData({
      ...data,
      recurrences: data.recurrences.filter((_, i) => i !== index),
    })
  }

  return (
    <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale='pt-br'>
      <Grid container component='form' spacing={2} onSubmit={handleSubmit}>
        <Grid item xs={12}>
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
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id='description'
            name='description'
            label='Descrição do horário'
            variant='outlined'
            placeholder='Digite a descrição do horário'
            type='text'
            value={data.description}
            onChange={handleChange}
            disabled={processing}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePicker
            value={data.startDate}
            label='Data de início'
            renderInput={BasicTextField}
            onChange={makeHandleChangeDate('startDate')}
            disabled={processing}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePicker
            value={data.endDate}
            label='Data de fim'
            renderInput={BasicTextField}
            onChange={makeHandleChangeDate('endDate')}
            disabled={processing}
          />
        </Grid>

        {data.recurrences.map(({ startTime, endTime, daysOfWeek, daysOfMonth, recurrentBy }, index, arr) => (
          <Fragment key={`${startTime.toISO()}-${endTime.toISO()}`}>
            <Grid item xs={12} display='flex' alignItems='center' gap={2}>
              <Typography variant='h6'>Horário #{index + 1}</Typography>
              <FormControl disabled={processing}>
                <InputLabel id={`recurrentBy-${index}-label`}>Recorrência por</InputLabel>
                <Select
                  labelId={`recurrentBy-${index}-label`}
                  id={`recurrentBy-${index}`}
                  value={recurrentBy}
                  label='Recorrência por'
                  onChange={makeRecurrenceByHandle(index)}
                >
                  <MenuItem value='week'>Dia da semana</MenuItem>
                  <MenuItem value='month'>Dia do mês</MenuItem>
                </Select>
              </FormControl>

              <IconButton onClick={makeRemoveRecurrence(index)} color='error'>
                <MdDelete />
              </IconButton>
            </Grid>
            <Grid item xs={12} sm={4}>
              {recurrentBy === 'week' ? (
                <ScheduleWeekSelect
                  id={`week-${index}`}
                  label='Dias da semana'
                  onChange={makeRecurrenceHandleChange('daysOfWeek', index)}
                  values={daysOfWeek}
                />
              ) : (
                <ScheduleMonthSelect
                  id={`month-${index}`}
                  label='Dias do mês'
                  onChange={makeRecurrenceHandleChange('daysOfMonth', index)}
                  values={daysOfMonth}
                />
              )}
            </Grid>
            <Grid item xs={12} sm={4}>
              <TimePicker
                label='Horário de início'
                value={startTime}
                onChange={makeRecurrenceHandleChange('startTime', index)}
                renderInput={BasicTextField}
                disabled={processing}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TimePicker
                label='Horário de fim'
                value={endTime}
                onChange={makeRecurrenceHandleChange('endTime', index)}
                renderInput={BasicTextField}
                disabled={processing}
              />
            </Grid>
            {arr.length - 1 !== index && (
              <Grid item xs={12}>
                <Divider />
              </Grid>
            )}
          </Fragment>
        ))}

        <Grid item xs={12} display='flex' justifyContent='flex-end' gap={2}>
          <Button variant='contained' color='success' type='button' onClick={addRecurrence} disabled={processing}>
            Adicionar horário
          </Button>
          <Button variant='contained' type='submit' disabled={processing}>
            Salvar
          </Button>
        </Grid>
      </Grid>
    </LocalizationProvider>
  )
}

const BasicTextField = (props: TextFieldProps) => <TextField {...props} variant='outlined' fullWidth />
