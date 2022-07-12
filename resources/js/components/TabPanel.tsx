import Box from '@mui/material/Box'
import React, { FC } from 'react'

interface TabPanelProps {
  selectedPanel: number
  panelNumber: number
  preRender?: boolean
}

export const TabPanel: FC<TabPanelProps> = ({ selectedPanel, panelNumber, children, preRender }) => {
  if (preRender) {
    return (
      <Box hidden={panelNumber !== selectedPanel} p={2}>
        {children}
      </Box>
    )
  }

  if (panelNumber === selectedPanel) {
    return <Box p={2}>{children}</Box>
  }

  return null
}
