import { useForm } from '@inertiajs/inertia-react'
import { Button, Container, FormControlLabel, FormGroup, Stack, Switch, TextField } from '@mui/material'
import React, { FC, ChangeEvent, FormEventHandler } from 'react'

interface IRegisterFormData {
  username: string
  email: string
  password: string
  password_confirmation: string
  rememberMe: boolean
}

const Register: FC = () => {
  const { data, setData, post, processing, errors } = useForm<IRegisterFormData>({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
    rememberMe: false,
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setData({ ...data, [name]: value })
  }

  const handleRememberMe = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, rememberMe: e.target.checked })
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()

    await post('/auth/register')
  }

  return (
    <Container maxWidth='md' sx={{ marginTop: 16 }}>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Stack spacing={1}>
            <h1>Registro</h1>
            <TextField
              name='username'
              id='username'
              required
              label='Nome de usuário'
              type='text'
              value={data.username}
              onChange={handleChange}
              error={'username' in errors}
              helperText={errors.username}
            />
            <TextField
              name='email'
              id='email'
              required
              label='E-mail'
              type='email'
              value={data.email}
              onChange={handleChange}
              error={'email' in errors}
              helperText={errors.email}
            />
            <TextField
              name='password'
              id='password'
              required
              label='Senha'
              type='password'
              value={data.password}
              onChange={handleChange}
              error={'password' in errors}
              helperText={errors.password}
            />
            <TextField
              name='password_confirmation'
              id='password_confirmation'
              required
              label='Confirmação de senha'
              type='password'
              value={data.password_confirmation}
              onChange={handleChange}
              error={'password_confirmation' in errors}
              helperText={errors.password_confirmation}
            />
            <FormControlLabel
              control={<Switch value={data.rememberMe} onChange={handleRememberMe} />}
              label='Lembrar-me'
            />

            <Button type='submit' variant='outlined' disabled={processing}>
              Registrar
            </Button>
          </Stack>
        </FormGroup>
      </form>
    </Container>
  )
}

export default Register
