import { AppLink } from '@/components/AppLink'
import { LineDivider } from '@/components/LineDivider'
import { useForm } from '@inertiajs/inertia-react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Container from '@mui/material/Container'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import React, { ChangeEvent, FC, FormEvent } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { VscArrowLeft } from 'react-icons/vsc'

interface LoginFormData {
  email: string
  password: string
  rememberMe: boolean
}

const LoginForm: FC = () => {
  const { data, setData, errors, post, processing } = useForm<LoginFormData>({
    email: '',
    password: '',
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

    post('/auth/login')
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

const Login: FC = () => {
  const theme = useTheme()

  return (
    <Box
      width='100vw'
      height='100vh'
      display='grid'
      sx={{
        placeItems: 'center',
        backgroundImage: 'url(/images/login-wave.svg)',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Container maxWidth='md'>
        <Paper sx={{ borderRadius: 3, padding: 2 }}>
          <AppLink href='/' icon={VscArrowLeft}>
            Voltar para HOME
          </AppLink>
          <Grid container spacing={2} alignItems='center' justifyContent='center'>
            <Grid item sm={6} sx={{ [theme.breakpoints.down('sm')]: { display: 'none' } }}>
              <img src='/images/login-img.svg' alt='Imagem de login' style={{ width: '100%' }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack spacing={2} alignItems='center'>
                <Typography variant='h2'>Login</Typography>
                <Stack direction='row'>
                  <a href='/auth/google/redirect'>
                    <FcGoogle size={32} />
                  </a>
                </Stack>
                <LineDivider>Ou</LineDivider>
                <LoginForm />
                <AppLink href='/users/recover-password'>Esqueci minha senha</AppLink>
                <AppLink href='/auth/register'>Registrar-se</AppLink>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  )
}

export default Login
