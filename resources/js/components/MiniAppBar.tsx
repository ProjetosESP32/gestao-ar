import { DRAWER_WIDTH } from '@/constants/drawer'
import { useThemeType } from '@/contexts/theme-type'
import { Inertia } from '@inertiajs/inertia'
import { usePage } from '@inertiajs/inertia-react'
import MuiAppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'
import React, { FC, MouseEvent, useState } from 'react'
import { MdMenu, MdNightsStay, MdWbSunny } from 'react-icons/md'
import { BasePageProps } from '../interfaces/BasePageProps'
import { getFirstLetters } from '../utils/getFirstLetters'
import { AppLink } from './AppLink'

interface AppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: DRAWER_WIDTH,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const ThemeButton = () => {
  const { type, toggle } = useThemeType()

  return (
    <IconButton sx={{ width: 56, height: 56 }} onClick={toggle}>
      {type === 'light' ? <MdNightsStay /> : <MdWbSunny />}
    </IconButton>
  )
}

const AvatarMenu: FC = () => {
  const { loggedUser } = usePage<BasePageProps>().props
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  const handleProfile = () => {
    Inertia.visit('/users/me')
    handleClose()
  }

  const handleLogout = () => {
    Inertia.delete('/auth/logout', { replace: true })
    handleClose()
  }

  return loggedUser ? (
    <>
      <Tooltip title='Abrir opções'>
        <IconButton onClick={handleClick}>
          <Avatar alt={loggedUser.username} src={loggedUser.cover?.url}>
            {getFirstLetters(loggedUser.username)}
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleClose}>
        <MenuItem onClick={handleProfile}>Perfil</MenuItem>
        <MenuItem onClick={handleLogout}>Sair</MenuItem>
      </Menu>
    </>
  ) : (
    <AppLink href='/auth/login'>Faça Login</AppLink>
  )
}

interface MiniAppBarProps {
  open?: boolean
  onOpen: () => void
}

export const MiniAppBar: FC<MiniAppBarProps> = ({ open, onOpen }) => (
  <AppBar position='fixed' open={open} elevation={1}>
    <Toolbar>
      <Box display='flex' alignItems='center' flexGrow={1}>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          onClick={onOpen}
          edge='start'
          sx={{
            marginRight: 2,
            ...(open && { display: 'none' }),
          }}
        >
          <MdMenu />
        </IconButton>
        <img src='/images/if-icon.svg' alt='Logo da aplicação' />
      </Box>
      <Stack direction='row' flexGrow={0}>
        <ThemeButton />
        <AvatarMenu />
      </Stack>
    </Toolbar>
  </AppBar>
)
