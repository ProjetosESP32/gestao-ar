import { Box, Container, Grid, Paper, Stack, Typography, useTheme } from '@mui/material'
import React from 'react'
import { ChangePasswordForm } from '@/components/ChangePasswordForm'

const ChangePassword = () => {
  const theme = useTheme()

  return (
    <Box
      width='100vw'
      height='100vh'
      display='grid'
      sx={{
        placeItems: 'center',
        backgroundImage: 'url(/images/change-pass-wave.svg)',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom',
      }}
    >
      <Container maxWidth='md'>
        <Paper sx={{ borderRadius: 3, padding: 2 }}>
          <Grid container spacing={2} alignItems='center' justifyContent='center'>
            <Grid item sm={7} sx={{ [theme.breakpoints.down('sm')]: { display: 'none' } }}>
              <img src='/images/change-pass-img.svg' alt='Imagem de login' style={{ width: '100%' }} />
            </Grid>
            <Grid item sm={5}>
              <Stack spacing={2} alignItems='center'>
                <Typography variant='h4'>Informe sua nova senha</Typography>
                <Typography>Por favor preencha os campos abaixo com a nova senha.</Typography>
                <ChangePasswordForm />
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  )
}

export default ChangePassword
