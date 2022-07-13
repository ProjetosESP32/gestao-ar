import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import React, { FC, ReactNode } from 'react'
import { MiniDrawer } from './MiniDrawer'
import { SimpleDrawer } from './SimpleDrawer'

interface DrawerProps {
  children: ReactNode
}

export const Drawer: FC<DrawerProps> = ({ children }) => {
  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.down('sm'))

  return isSm ? <SimpleDrawer>{children}</SimpleDrawer> : <MiniDrawer>{children}</MiniDrawer>
}
