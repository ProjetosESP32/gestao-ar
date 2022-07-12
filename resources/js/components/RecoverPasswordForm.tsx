import { useForm } from '@inertiajs/inertia-react'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import React, { ChangeEvent, FC, FormEvent } from 'react'

interface RecoverPasswordFormData {
  email: string
}

export const RecoverPasswordForm: FC = () => {
  const { data, setData, errors, processing, post } = useForm<RecoverPasswordFormData>({ email: '' })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setData({ ...data, [name]: value })
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    await post('/users/recover-password')
  }

  return (
    <Stack component='form' onSubmit={handleSubmit} spacing={2} width='100%'>
      <TextField
        fullWidth
        id='email'
        name='email'
        label='E-mail'
        variant='outlined'
        placeholder='Digite seu e-mail'
        type='email'
        value={data.email}
        error={!!errors.email}
        helperText={errors.email}
        onChange={handleChange}
        disabled={processing}
      />
      <Button variant='contained' type='submit' fullWidth disabled={processing}>
        Enviar
      </Button>
    </Stack>
  )
}
