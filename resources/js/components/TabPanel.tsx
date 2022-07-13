import Box from '@mui/material/Box'
import React, { FC, ReactNode } from 'react'

interface TabPanelProps {
  selectedPanel: number
  panelNumber: number
  preRender?: boolean
  children: ReactNode
}

export const TabPanel: FC<TabPanelProps> = ({ selectedPanel, panelNumber, children, preRender }) => {
  if (preRender) {
    return (
      <Box hidden={panelNumber !== selectedPanel} p={1}>
        {children}
      </Box>
    )
  }

  if (panelNumber === selectedPanel) {
    return <Box p={1}>{children}</Box>
  }

  return null
}
