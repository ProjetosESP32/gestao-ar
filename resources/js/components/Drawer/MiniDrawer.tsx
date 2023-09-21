import Box from '@mui/material/Box'
import React, { FC, ReactNode, useState } from 'react'
import { MiniAppBar } from '../MiniAppBar'
import { DrawerContent } from './DrawerContent'
import { DrawerComponent, DrawerHeader } from './styles'

export interface MiniDrawerProps {
  children: ReactNode
}

export const MiniDrawer: FC<MiniDrawerProps> = ({ children }) => {
  const [open, setOpen] = useState(false)

  const handleDrawerOpen = () => setOpen(true)
  const handleDrawerClose = () => setOpen(false)

  return (
    <Box display='flex'>
      <MiniAppBar onOpen={handleDrawerOpen} open={open} />
      <DrawerComponent variant='permanent' open={open}>
        <DrawerContent open={open} onClose={handleDrawerClose} />
      </DrawerComponent>
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  )
}
