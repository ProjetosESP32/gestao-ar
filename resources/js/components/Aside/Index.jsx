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
  MdMail,
  MdInbox,
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

// @ts-ignore
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

// @ts-ignore
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

// @ts-ignore
const Drawer = styled(MuiDrawer, { shouldForwardProp: prop => prop !== 'open' })(({ theme, open }) => {
  // @ts-ignore
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

/**
 * @param {{ open?: any; handleDrawerClose?: any; theme?: any; DrawerHeader?: any; }} props
 */
function Aside(props) {
  const { open, setOpen } = React.useContext(DrawerContext)
  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const { DrawerHeader } = props
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
          onClick={props.handleDrawerClose}
        >
          {props.theme.direction === 'rtl' ? <MdChevronRight /> : <MdChevronLeft />}
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
  DrawerHeader: PropTypes.any,
}
export default Aside
