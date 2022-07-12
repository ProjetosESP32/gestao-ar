import { Link } from '@inertiajs/inertia-react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import React from 'react'
import { VscArrowLeft } from 'react-icons/vsc'

const Error404 = () => (
  <Box width='100vw' height='100vh' display='grid' sx={{ placeItems: 'center' }}>
    <Container maxWidth='md'>
      <Link href='/'>
        <VscArrowLeft /> Voltar para Home
      </Link>
      <Stack width='100%' spacing={2} alignItems='center'>
        <Typography variant='h1' textAlign='center'>
          404
        </Typography>
        <Typography variant='h2' textAlign='center'>
          Página não encontrada
        </Typography>
        <Typography textAlign='center'>
          Não foi possível encontrar a página que você procura. Você digitou a URL corretamente?
        </Typography>
        <img src='/images/error404-img.svg' alt='Erro 404' style={{ maxWidth: '100%' }} />
      </Stack>
    </Container>
  </Box>
)

export default Error404
