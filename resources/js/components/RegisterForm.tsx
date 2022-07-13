import { useForm } from '@inertiajs/inertia-react'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import React, { ChangeEvent, FC, FormEvent } from 'react'

interface RegisterFormData {
  username: string
  email: string
  password: string
  passwordConfirmation: string
  rememberMe: boolean
}

export const RegisterForm: FC = () => {
  const { data, setData, errors, post, processing } = useForm<RegisterFormData>({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    rememberMe: true,
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setData({ ...data, [name]: value })
  }

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    const { name } = event.target

    setData({ ...data, [name]: checked })
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    post('/auth/register')
  }

  return (
    <Stack component='form' onSubmit={handleSubmit} spacing={2} width='100%'>
      <TextField
        fullWidth
        id='username'
        name='username'
        label='Nome de usuário'
        variant='outlined'
        placeholder='Digite seu nome de usuário'
        value={data.username}
        error={!!errors.username}
        helperText={errors.username}
        onChange={handleChange}
        disabled={processing}
      />
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
      <FormControl error={!!errors.rememberMe} disabled={processing} fullWidth>
        <FormControlLabel
          control={
            <Checkbox checked={data.rememberMe} onChange={handleCheckboxChange} id='rememberMe' name='rememberMe' />
          }
          label='Lembrar login'
        />
        {!!errors.rememberMe && <FormHelperText>{errors.rememberMe}</FormHelperText>}
      </FormControl>
      <Button type='submit' fullWidth disabled={processing}>
        Entrar
      </Button>
    </Stack>
  )
}
