import { Link } from '@inertiajs/inertia-react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import React from 'react'
import { VscArrowLeft } from 'react-icons/vsc'

const Error500 = () => (
  <Box width='100vw' height='100vh' display='grid' sx={{ placeItems: 'center' }}>
    <Container maxWidth='md'>
      <Link href='/'>
        <VscArrowLeft /> Voltar para Home
      </Link>
      <Stack width='100%' spacing={2} alignItems='center'>
        <Typography variant='h1' textAlign='center'>
          500
        </Typography>
        <Typography variant='h2' textAlign='center'>
          Erro inesperado!
        </Typography>
        <Typography textAlign='center'>Ocorreu um erro grave no servidor, volte a tela de início.</Typography>
        <img src='/images/error500-img.svg' alt='Erro 500' style={{ maxWidth: '100%' }} />
      </Stack>
    </Container>
  </Box>
)

export default Error500
