import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import React, { FC } from 'react'

export const InitialComponent: FC = () => (
  <Box display='grid' width='100vw' height='100vh' sx={{ placeItems: 'center' }}>
    <CircularProgress size='6rem' />
  </Box>
)
