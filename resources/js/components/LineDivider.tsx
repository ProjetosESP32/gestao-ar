import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import React, { FC } from 'react'

const InlineDivider = () => <Box component='div' width='100%' bgcolor='black' height='3px' borderRadius='1.5px' />

export const LineDivider: FC = ({ children }) => (
  <Stack direction='row' alignItems='center' spacing={2} width='75%'>
    <InlineDivider />
    <Typography>{children}</Typography>
    <InlineDivider />
  </Stack>
)
