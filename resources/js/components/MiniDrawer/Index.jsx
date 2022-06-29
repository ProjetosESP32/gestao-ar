import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { useTheme } from '@mui/system'
import * as PropTypes from 'prop-types'
import React, { useContext } from 'react'
import Aside from '../../components/Aside/Index.jsx'
import { DrawerContext } from '../../providers/drawer.jsx'
import PanelAppbar from '../Appbar/Index.jsx'
import Navigation from '../BottomNavigation/index.jsx'
import { useStyles } from '../Classes/Index.jsx'

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
  const Footer = styled('div')(() => ({
    backgroundColor: '#3F51B5',
    color: 'white',
    textAlign: 'center',
    width: '100%',
    display: 'block',
    fontWeight: 'bold',
    fontSize: '1.1rem',
    lineHeight: '1.35rem',
    padding: '2.2rem 0',
    '& p': {
      color: 'white',
    },
  }))
  const classes = useStyles()
  return (
    <Box
      // sx={{ display: 'flex' }}
      style={{
        minHeight: '100vh',
        backgroundColor: '#F7F7F7',
        width: '100%',
        maxWidth: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ display: 'flex' }}>
        <PanelAppbar></PanelAppbar>
        <Aside handleDrawerClose={handleDrawerClose} theme={theme} DrawerHeader={DrawerHeader} />
        <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          {children}
        </Box>
      </div>
      <Navigation />
      <Footer className={classes.desktop}>
        <p>Copyright, {new Date().getFullYear()}</p> <p>SASC, Todos Os Direitos Reservados</p>
      </Footer>
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
