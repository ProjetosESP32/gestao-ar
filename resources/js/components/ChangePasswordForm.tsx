import { useForm, usePage } from '@inertiajs/inertia-react'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import React, { ChangeEvent, FC, FormEvent } from 'react'

interface ChangePasswordFormData {
  password: string
  passwordConfirmation: string
}

export const ChangePasswordForm: FC = () => {
  const { url } = usePage()
  const { data, setData, post, errors, processing } = useForm<ChangePasswordFormData>({
    password: '',
    passwordConfirmation: '',
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setData({ ...data, [name]: value })
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    await post(url)
  }

  return (
    <Stack component='form' onSubmit={handleSubmit} spacing={2} width='100%'>
      <TextField
        fullWidth
        id='password'
        name='password'
        label='Senha'
        variant='outlined'
        placeholder='Digite sua senha'
        type='password'
        value={data.password}
        error={!!errors.password}
        helperText={errors.password}
        onChange={handleChange}
        disabled={processing}
      />
      <TextField
        fullWidth
        id='passwordConfirmation'
        name='passwordConfirmation'
        label='Confirme sua senha'
        variant='outlined'
        placeholder='Digite a confirmação da senha'
        type='password'
        value={data.passwordConfirmation}
        error={!!errors.passwordConfirmation}
        helperText={errors.passwordConfirmation}
        onChange={handleChange}
        disabled={processing}
      />
      <Button variant='contained' type='submit' fullWidth disabled={processing}>
        Enviar
      </Button>
    </Stack>
  )
}
