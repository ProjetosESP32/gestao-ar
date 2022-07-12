import { Link } from '@inertiajs/inertia-react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import React from 'react'
import { VscArrowLeft } from 'react-icons/vsc'

const Error403 = () => (
  <Box width='100vw' height='100vh' display='grid' sx={{ placeItems: 'center' }}>
    <Container maxWidth='md'>
      <Link href='/'>
        <VscArrowLeft /> Voltar para Home
      </Link>
      <Stack width='100%' spacing={2} alignItems='center'>
        <Typography variant='h1' textAlign='center'>
          403
        </Typography>
        <Typography variant='h2' textAlign='center'>
          Ops! Acesso negado
        </Typography>
        <Typography textAlign='center'>
          Você não possui permissão para acessar o link solicitado. Verifique seus dados de autenticação ou se você
          possui autorização ao recurso.
        </Typography>
        <img src='/images/error403-img.svg' alt='Erro 403' style={{ maxWidth: '100%' }} />
      </Stack>
    </Container>
  </Box>
)

export default Error403
