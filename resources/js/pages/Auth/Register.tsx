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
import { AppLink } from '@/components/AppLink'
import { LineDivider } from '@/components/LineDivider'
import { RegisterForm } from '@/components/RegisterForm'

const Register: FC = () => {
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
            <Grid item sm={6} md={7} sx={{ [theme.breakpoints.down('sm')]: { display: 'none' } }}>
              <img src='/images/user-register-img.svg' alt='Imagem de login' style={{ width: '100%' }} />
            </Grid>
            <Grid item xs={12} sm={6} md={5}>
              <Stack spacing={2} alignItems='center'>
                <Typography variant='h2'>Registro</Typography>
                <Stack direction='row'>
                  <a href='/auth/google/redirect'>
                    <FcGoogle size={32} />
                  </a>
                </Stack>
                <LineDivider>Ou</LineDivider>
                <RegisterForm />
                <AppLink href='/auth/login'>Fazer Login</AppLink>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  )
}

export default Register
