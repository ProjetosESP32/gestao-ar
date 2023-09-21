import { BasePageProps } from '@/interfaces/BasePageProps'
import { Inertia } from '@inertiajs/inertia'
import { usePage } from '@inertiajs/inertia-react'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import React, { FC } from 'react'
import { IconType } from 'react-icons/lib'
import { MdApi, MdChevronLeft, MdChevronRight, MdHome, MdHowToReg, MdListAlt } from 'react-icons/md'
import { VscCircuitBoard } from 'react-icons/vsc'
import { DrawerHeader } from './styles'

interface DrawerButtonProps {
  open: boolean
  onClick?: () => void
  icon: IconType
  text: string
}

export const DrawerButton: FC<DrawerButtonProps> = ({ open, onClick, icon: Icon, text }) => (
  <ListItem disablePadding sx={{ display: 'block' }}>
    <ListItemButton
      sx={{
        minHeight: 48,
        justifyContent: open ? 'initial' : 'center',
        px: 2.5,
      }}
      onClick={onClick}
    >
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: open ? 3 : 'auto',
          justifyContent: 'center',
        }}
      >
        <Icon />
      </ListItemIcon>
      <ListItemText sx={{ opacity: open ? 1 : 0 }}>{text}</ListItemText>
    </ListItemButton>
  </ListItem>
)

interface DrawerContentProps {
  open: boolean
  onClose: () => void
}

export const DrawerContent: FC<DrawerContentProps> = ({ open, onClose }) => {
  const theme = useTheme()
  const { loggedUser } = usePage<BasePageProps>().props

  return (
    <>
      <DrawerHeader>
        <Typography variant='h6'>Gestão Ar</Typography>
        <IconButton onClick={onClose}>{theme.direction === 'rtl' ? <MdChevronRight /> : <MdChevronLeft />}</IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <DrawerButton icon={MdHome} onClick={() => Inertia.visit('/')} text='Home' open={open} />
        <DrawerButton icon={MdListAlt} onClick={() => Inertia.visit('/rooms')} text='Salas' open={open} />
      </List>
      {loggedUser?.isRoot ? (
        <>
          <Divider />
          <List>
            <DrawerButton icon={MdApi} onClick={() => Inertia.visit('/admin/apis')} text="API's" open={open} />
            <DrawerButton
              icon={VscCircuitBoard}
              onClick={() => Inertia.visit('/admin/esps')}
              text="ESP's"
              open={open}
            />
            <DrawerButton icon={MdHowToReg} onClick={() => Inertia.visit('/admin/users')} text='Usuários' open={open} />
          </List>
        </>
      ) : null}
    </>
  )
}
