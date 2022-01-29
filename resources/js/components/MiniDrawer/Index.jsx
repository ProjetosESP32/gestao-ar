import Box from '@mui/material/Box'

import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'

import React, { useContext } from 'react'

import Aside from '../../components/Aside/Index.jsx'
import { DrawerContext } from '../../providers/drawer.jsx'
// @ts-ignore
import { theme } from '../../theme.ts'
import PanelAppbar from '../Appbar/Index.jsx'

const DrawerHeader = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

/**
 * @param {{ children: any }} props
 */
const MiniDrawer = props => {
  const { setOpen } = useContext(DrawerContext)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }
  return (
    <Box sx={{ display: 'flex' }} style={{ backgroundColor: '#F7F7F7' }}>
      <PanelAppbar></PanelAppbar>
      <Aside handleDrawerClose={handleDrawerClose} theme={theme} DrawerHeader={DrawerHeader} />
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {props.children}
      </Box>
    </Box>
  )
}
export default MiniDrawer
