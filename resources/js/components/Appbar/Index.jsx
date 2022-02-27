import { Inertia } from '@inertiajs/inertia'
import { Link, usePage } from '@inertiajs/inertia-react'
import { Grid, Typography, useTheme } from '@mui/material'
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
import React, { useContext, useState } from 'react'
import { MdSearch, MdNotifications } from 'react-icons/md'
import { DrawerContext } from '../../providers/drawer.jsx'
import { useStyles } from '../Classes/Index'

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme }) => {
  const { drawerWidth, open } = useContext(DrawerContext)

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

const StyledToolbar = styled(Toolbar)(() => ({
  backgroundColor: 'white',
  boxShadow: 'none',
  zIndex: '1',
}))

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

const PanelAppbar = () => {
  const { user } = usePage().props
  const { open } = useContext(DrawerContext)
  const theme = useTheme()
  const [anchorElUser, setAnchorElUser] = useState(null)

  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget)
  }

  const handleProfile = () => {
    Inertia.visit('/users/me')
    handleCloseUserMenu()
  }

  const handleLogout = () => {
    Inertia.delete('/auth/logout', { replace: true })
    handleCloseUserMenu()
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
  const classes = useStyles()

  return (
    <AppBar position='fixed' open={open}>
      <StyledToolbar className={classes.mobile}>
        <Grid
          sx={{
            ...!open,
            backgroundColor: 'red',
            margin: 'auto',
          }}
          container
          spacing={2}
          columns={{ xl: 11, lg: 11 }}
          justifyContent='center'
        >
          <Grid item xs={11}>
            <Item style={{ boxShadow: 'none' }}>
              <IconButton sx={{ p: 0, margin: '0 1rem' }}>
                <MdNotifications size={36} />
              </IconButton>
              <IconButton sx={{ p: 0, margin: '0 1rem' }}>
                <MdNotifications size={36} />
              </IconButton>
            </Item>
          </Grid>
        </Grid>
      </StyledToolbar>
      <StyledToolbar className={classes.desktop}>
        <Grid
          sx={{
            ...(!open && { marginLeft: `calc(${theme.spacing(7)} + 1px)` }),
          }}
          container
          spacing={2}
          columns={{ xl: 11, lg: 11 }}
          justifyContent='center'
        >
          <Grid item xs={8}>
            <Item style={{ boxShadow: 'none' }}>
              <Toolbar disableGutters style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant='h6' noWrap component='div' sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
                  <MdSearch style={{ width: '2.5rem', height: '2.5rem' }}></MdSearch>
                </Typography>

                <Typography
                  variant='h6'
                  noWrap
                  component='div'
                  sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                >
                  <MdSearch></MdSearch>
                </Typography>

                <Box sx={{ flexGrow: 0 }}>
                  {user ? (
                    <>
                      <IconButton sx={{ p: 0, margin: '0 1rem' }}>
                        <MdNotifications size={36} />
                      </IconButton>
                      <Tooltip title='Open settings'>
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                          <Avatar alt={user.username} src={user.cover?.url ?? '/images/user.png'} />
                        </IconButton>
                      </Tooltip>
                      <Menu
                        sx={{ mt: '45px' }}
                        id='menu-appbar'
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
                        <MenuItem onClick={handleProfile}>
                          <Typography textAlign='center'>Perfil</Typography>
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>
                          <Typography textAlign='center'>Logout</Typography>
                        </MenuItem>
                      </Menu>
                    </>
                  ) : (
                    <Link href='auth/login'>Faça Login</Link>
                  )}
                </Box>
              </Toolbar>
            </Item>
          </Grid>
        </Grid>
      </StyledToolbar>
    </AppBar>
  )
}

export default PanelAppbar
