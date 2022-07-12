import { Inertia } from '@inertiajs/inertia'
import { Link, usePage } from '@inertiajs/inertia-react'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import React, { FC, useState } from 'react'
import { BasePageProps } from '../interfaces/BasePageProps'
import { getFirstLetters } from '../utils/getFirstLetters'

export const AvatarMenu: FC = () => {
  const { loggedUser } = usePage<BasePageProps>().props
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)
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
        <MenuItem onClick={handleClose}>Notificações</MenuItem>
        <MenuItem onClick={handleLogout}>Sair</MenuItem>
      </Menu>
    </>
  ) : (
    <Link href='/auth/login'>Faça Login</Link>
  )
}
