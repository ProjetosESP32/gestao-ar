import React from 'react'
import { Box } from '@mui/material'
import './pagina404CSS.css'
import { Grid, Typography } from '@mui/material'

const Error404 = () => {
  const a = ''
  return (
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
          <img style={{ width: '2rem', height: '2rem' }} src='/images/if-icon.svg' alt='' />
        </Grid>

        <Grid item xl={6} md={8}>
          <h2 className='erro404'>500</h2>
          <h2 className='txt404'>Erro Inesperado!</h2>
          <p className='ErrorDescription'>
            Um erro inesperado ocorreu, tentar reiniciar a página ou voltar a tela de inicio pode solucionar o problema
          </p>

          <img className='ErrorImg' src='/images/error500-img.svg' alt='' />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Error404
