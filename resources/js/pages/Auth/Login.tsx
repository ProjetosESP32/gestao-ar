import { Link } from '@inertiajs/inertia-react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import React, { FC } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { VscArrowLeft } from 'react-icons/vsc'
import { LineDivider } from '@/components/LineDivider'
import { LoginForm } from '@/components/LoginForm'

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
          <Link href='/'>
            <VscArrowLeft /> Voltar para Home
          </Link>
          <Grid container spacing={2} alignItems='center' justifyContent='center'>
            <Grid item sm={7} sx={{ [theme.breakpoints.down('sm')]: { display: 'none' } }}>
              <img src='/images/login-img.svg' alt='Imagem de login' style={{ width: '100%' }} />
            </Grid>
            <Grid item sm={5}>
              <Stack spacing={2} alignItems='center'>
                <Typography variant='h2'>Login</Typography>
                <Stack direction='row'>
                  <a href='/auth/google/redirect'>
                    <FcGoogle size={32} />
                  </a>
                </Stack>
                <LineDivider>Ou</LineDivider>
                <LoginForm />
                <Link href='/users/recover-password'>Esqueci minha senha</Link>
                <Link href='/auth/register'>Registrar-se</Link>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  )
}

export default Login
