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
        <Grid item xl={6} md={8} sx={{ height: 'max-content', justifyContent: 'flex-start' }}>
          <img style={{ width: '2rem', height: '2rem' }} src='/images/if-icon.svg' alt='' />
        </Grid>

        <Grid item xl={6} md={8}>
          <h2 className='erro404'>404</h2>
          <h2 className='txt404'>Desculpe, página não encontrada</h2>
          <p className='ErrorDescription'>
            Não foi possível encontrar a página que você está procurando. Talvez você tenha digitado incorretamente a
            URL? Certifique-se de verificar a ortografia.
          </p>

          <img className='ErrorImg' src='Grupo23.png' alt='' />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Error404
