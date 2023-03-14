import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Toolbar from '@mui/material/Toolbar'
import React, { FC } from 'react'
import { MdMenu } from 'react-icons/md'
import { AvatarMenu } from '../AvatarMenu'
import { ThemeButton } from './ThemeButton'
import { AppBar } from './styles'

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
