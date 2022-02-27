import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { useTheme } from '@mui/system'
import * as PropTypes from 'prop-types'
import React, { useContext } from 'react'
import Aside from '../../components/Aside/Index.jsx'
import { DrawerContext } from '../../providers/drawer.jsx'
import PanelAppbar from '../Appbar/Index.jsx'
import Navigation from '../BottomNavigation/index.jsx'

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

const MiniDrawer = ({ children }) => {
  const theme = useTheme()
  const { setOpen } = useContext(DrawerContext)

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <Box
      sx={{ display: 'flex' }}
      style={{ minHeight: '100vh', backgroundColor: '#F7F7F7', width: '100%', maxWidth: '100vw' }}
    >
      <PanelAppbar></PanelAppbar>
      <Aside handleDrawerClose={handleDrawerClose} theme={theme} DrawerHeader={DrawerHeader} />
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
      <Navigation />
    </Box>
  )
}

MiniDrawer.propTypes = {
  children: PropTypes.node,
}

MiniDrawer.defaultProps = {
  children: null,
}

export default MiniDrawer
