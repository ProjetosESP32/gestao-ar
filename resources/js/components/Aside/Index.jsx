import Divider from '@mui/material/Divider'
import MuiDrawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { styled } from '@mui/material/styles'
import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import {
  MdChevronLeft,
  MdChevronRight,
  MdListAlt,
  MdCalendarToday,
  MdRequestQuote,
  MdOutlineAppRegistration,
  MdHowToReg,
  MdOutlineNotificationAdd,
  MdMenu,
} from 'react-icons/md'
import { DrawerContext } from '../../providers/drawer.jsx'
import Icon from '../Icon/Index.jsx'

const OpenedMixin = theme => {
  const { drawerWidth } = useContext(DrawerContext)

  return {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
  }
}

const closedMixin = theme => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
})

const Drawer = styled(MuiDrawer, { shouldForwardProp: prop => prop !== 'open' })(({ theme, open }) => {
  const { drawerWidth } = useContext(DrawerContext)

  return {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...OpenedMixin(theme),
      '& .MuiDrawer-paper': OpenedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }
})

const Aside = ({ DrawerHeader, theme, handleDrawerClose }) => {
  const { open, setOpen } = useContext(DrawerContext)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  return (
    <Drawer variant='permanent' open={open}>
      <DrawerHeader>
        <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
          <img src='/images/logo.svg'></img>
        </div>

        <IconButton
          sx={{
            ...(!open && { display: 'none' }),
          }}
          onClick={handleDrawerClose}
        >
          {theme.direction === 'rtl' ? <MdChevronRight /> : <MdChevronLeft />}
        </IconButton>
      </DrawerHeader>

      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              onClick={handleDrawerOpen}
              edge='start'
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MdMenu />
            </IconButton>
          </ListItemIcon>
          <ListItemText primary='Geral' />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Icon name={MdListAlt}></Icon>
          </ListItemIcon>
          <ListItemText primary='Controle de Salas' />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Icon name={MdCalendarToday}></Icon>
          </ListItemIcon>
          <ListItemText primary='Agenda De Eventos' />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Icon name={MdRequestQuote}></Icon>
          </ListItemIcon>
          <ListItemText primary='Historico de Consumo' />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon></ListItemIcon>
          <ListItemText primary='Admin' />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Icon name={MdOutlineAppRegistration}></Icon>
          </ListItemIcon>
          <ListItemText primary='Cadastro de Salas' />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Icon name={MdHowToReg}></Icon>
          </ListItemIcon>
          <ListItemText primary='Cadastro de Usuários' />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Icon name={MdOutlineNotificationAdd}></Icon>
          </ListItemIcon>
          <ListItemText primary='Gerar Notificação' />
        </ListItem>
      </List>
    </Drawer>
  )
}

Aside.propTypes = {
  handleDrawerClose: PropTypes.func,
  theme: PropTypes.any,
  DrawerHeader: PropTypes.elementType.isRequired,
}

export default Aside
