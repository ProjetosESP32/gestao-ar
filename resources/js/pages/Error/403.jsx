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
      <Grid item xl={6} md={8} sx={{ height: 'max-content', justifyContent: 'flex-start' }}>
        <img style={{ width: '2rem', height: '2rem' }} src='/images/if-icon.svg' alt='' />
      </Grid>

      <Grid item xl={6} md={8}>
        <h2 className='erro404'>403</h2>
        <h2 className='txt404'>Obs! seu acesso foi negado</h2>
        <p className='ErrorDescription'>
          Você não possui permissão para acessar o link solicitado. Verifique se os dados de autenticação foram
          informados corretamente ou se possui autorização de acesso.
        </p>

        <img className='ErrorImg' src='/images/error403-img.svg' alt='' />
      </Grid>
    </Grid>
  </Box>
)

export default Error404
