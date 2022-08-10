import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import React from 'react'
import { VscArrowLeft } from 'react-icons/vsc'
import { AppLink } from '@/components/AppLink'

const VerifyEmail = () => {
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
                <Typography variant='h4'>Email verificado</Typography>
                <Typography>Email verificado com sucesso, pode voltar para a página inicial.</Typography>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  )
}

export default VerifyEmail
