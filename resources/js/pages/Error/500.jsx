import { Box, Grid } from '@mui/material'
import React from 'react'
import './pagina404CSS.css'

const Error404 = () => (
  <Box
    sx={{ display: 'flex' }}
    style={{
      justifyContent: 'center',
      minHeight: '100vh',
      minWidth: '100vw',
      backgroundColor: '#F7F7F7',
    }}
  >
    <Grid container spacing={2} columns={{ xl: 11, lg: 11, md: 11 }} justifyContent='center'>
      <Grid item xl={6} md={8} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
        <img style={{ width: '2rem', height: '2rem' }} src='/images/if-icon.svg' alt='Logo' />
      </Grid>

      <Grid item xl={6} md={8}>
        <h2 className='erro404'>500</h2>
        <h2 className='txt404'>Erro Inesperado!</h2>
        <p className='ErrorDescription'>
          Um erro inesperado ocorreu, tente reiniciar a página ou voltar a tela de inicio pode solucionar o problema
        </p>

        <img className='ErrorImg' src='/images/error500-img.svg' alt='HTTP Status 500 image' />
      </Grid>
    </Grid>
  </Box>
)

export default Error404
