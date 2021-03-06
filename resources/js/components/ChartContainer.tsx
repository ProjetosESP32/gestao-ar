import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import React, { FC, ReactNode } from 'react'

interface ChartContainerProps {
  title: string
  children: ReactNode
}

export const ChartContainer: FC<ChartContainerProps> = ({ title, children }) => (
  <Paper sx={{ padding: 2, width: '100%' }}>
    <Typography variant='h4'>{title}</Typography>
    {children}
  </Paper>
)
