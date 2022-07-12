import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import { useTheme } from '@mui/material/styles'
import React, { FC, useState } from 'react'
import { SimpleAppBar } from '../AppBar/SimpleAppBar'
import { DrawerContent } from './DrawerContent'
import { DrawerHeader } from './styles'

export const SimpleDrawer: FC = ({ children }) => {
  const theme = useTheme()
  const [open, setOpen] = useState(false)

  const handleDrawerOpen = () => setOpen(true)
  const handleDrawerClose = () => setOpen(false)

  return (
    <Box display='flex'>
      <SimpleAppBar onOpen={handleDrawerOpen} />
      <Drawer open={open} onClose={handleDrawerClose} sx={{ zIndex: theme.zIndex.drawer + 2 }}>
        <DrawerContent open onClose={handleDrawerClose} />
      </Drawer>
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  )
}
