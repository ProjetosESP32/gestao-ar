import { AppLink } from '@/components/AppLink'
import { useForm } from '@inertiajs/inertia-react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import React, { ChangeEvent, FC, FormEvent } from 'react'
import { VscArrowLeft } from 'react-icons/vsc'

interface RecoverPasswordFormData {
  email: string
}

export const RecoverPasswordForm: FC = () => {
  const { data, setData, errors, processing, post } = useForm<RecoverPasswordFormData>({ email: '' })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setData({ ...data, [name]: value })
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    post('/users/recover-password')
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
      <Button type='submit' fullWidth disabled={processing}>
        Enviar
      </Button>
    </Stack>
  )
}

const RecoverPassword = () => {
  const theme = useTheme()

  return (
    <Box
      width='100vw'
      height='100vh'
      display='grid'
      sx={{
        placeItems: 'center',
        backgroundImage: 'url(/images/recover-pass-wave.svg)',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom',
      }}
    >
      <Container maxWidth='md'>
        <Paper sx={{ borderRadius: 3, padding: 2 }}>
          <AppLink href='/' icon={VscArrowLeft} style={{ marginBottom: '2rem' }}>
            Voltar para HOME
          </AppLink>
          <Grid container spacing={2} alignItems='center' justifyContent='center'>
            <Grid item sm={6} sx={{ [theme.breakpoints.down('sm')]: { display: 'none' } }}>
              <img src='/images/recover-pass-img.svg' alt='Imagem de login' style={{ width: '100%' }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack spacing={2} alignItems='center'>
                <Typography variant='h4'>Esqueceu sua senha?</Typography>
                <Typography>
                  Por favor, insira o endereço de e-mail associado à sua conta e te enviaremos um link de redefinição de
                  senha.
                </Typography>
                <RecoverPasswordForm />
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  )
}

export default RecoverPassword
