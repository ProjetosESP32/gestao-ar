import { Grid, Typography } from '@mui/material'
import MuiAppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import * as React from 'react'
import { MdSearch } from 'react-icons/md'
import Aside from '../../components/Aside/Index.jsx'
import { DrawerContext } from '../../providers/drawer.jsx'
import { theme } from '../../theme.jsx'

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open',
  // @ts-ignore
})(() => {
  const { drawerWidth, open, setOpen } = React.useContext(DrawerContext)
  return {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }
})

const DrawerHeader = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

const Item = styled(Paper)(() => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

/**
 * @param {{ children: any }} props
 */
export default function MiniDrawer(props) {
  const { open, setOpen } = React.useContext(DrawerContext)
  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const settings = ['Perfil', 'Dashboard', 'Logout']

  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)

  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <div style={{ backgroundColor: '#F7F7F7' }}>
      <Box sx={{ display: 'flex' }}>
        <AppBar
          position={'fixed'}
          // @ts-ignore
          open={open}
        >
          <Toolbar style={{ backgroundColor: 'white', boxShadow: 'none', zIndex: '1' }}>
            <Grid
              sx={{
                ...(!open && { marginLeft: `calc(${theme.spacing(7)} + 1px)` }),
              }}
              container
              spacing={2}
              columns={{ xl: 11, lg: 11 }}
              justifyContent={'center'}
            >
              <Grid item xs={8}>
                <Item style={{ boxShadow: 'none' }}>
                  <Toolbar disableGutters style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography
                      variant={'h6'}
                      noWrap
                      component={'div'}
                      sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                    >
                      <MdSearch style={{ width: '2.5rem', height: '2.5rem' }}></MdSearch>
                    </Typography>

                    <Typography
                      variant={'h6'}
                      noWrap
                      component={'div'}
                      sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                    >
                      <MdSearch></MdSearch>
                    </Typography>

                    <Box sx={{ flexGrow: 0 }}>
                      <Tooltip title={'Open settings'}>
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                          <Avatar alt={'Remy Sharp'} src={'images/perfil.jpg'} />
                        </IconButton>
                      </Tooltip>
                      <Menu
                        sx={{ mt: '45px' }}
                        id={'menu-appbar'}
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                      >
                        {settings.map(setting => (
                          <MenuItem key={setting} onClick={handleCloseNavMenu}>
                            <Typography textAlign={'center'}>{setting}</Typography>
                          </MenuItem>
                        ))}
                      </Menu>
                    </Box>
                  </Toolbar>
                </Item>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Aside open={open} handleDrawerClose={handleDrawerClose} theme={theme} DrawerHeader={DrawerHeader} />
        <Box component={'main'} sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          {props.children}
        </Box>
      </Box>
    </div>
  )
}
