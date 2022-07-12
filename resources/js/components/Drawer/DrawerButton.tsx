import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import React, { FC } from 'react'
import { IconType } from 'react-icons/lib'

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
