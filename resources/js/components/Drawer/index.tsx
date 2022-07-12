import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import React, { FC } from 'react'
import { MiniDrawer } from './MiniDrawer'
import { SimpleDrawer } from './SimpleDrawer'

export const Drawer: FC = ({ children }) => {
  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.down('sm'))

  return isSm ? <SimpleDrawer>{children}</SimpleDrawer> : <MiniDrawer>{children}</MiniDrawer>
}
