import { useForm, Link } from '@inertiajs/inertia-react'
import { Button, Container, FormControlLabel, FormGroup, Stack, Switch, TextField } from '@mui/material'
import React, { FC, ChangeEvent, FormEventHandler } from 'react'

interface ILoginFormData {
  email: string
  password: string
  rememberMe: boolean
}

const Login: FC = () => {
  const { data, setData, post, processing, errors } = useForm<ILoginFormData>({
    email: '',
    password: '',
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

    await post('/auth/login')
  }

  return (
    <Container maxWidth='md' sx={{ marginTop: 16 }}>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Stack spacing={1}>
            <h1>Login</h1>
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
            <FormControlLabel
              control={<Switch value={data.rememberMe} onChange={handleRememberMe} />}
              label='Lembrar-me'
            />
            <Link href='/auth/register'>Registrar</Link>

            <Button type='submit' variant='outlined' disabled={processing}>
              Login
            </Button>
          </Stack>
        </FormGroup>
      </form>
    </Container>
  )
}

export default Login
