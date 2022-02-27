import * as PropTypes from 'prop-types'
import React, { createContext, useState } from 'react'

export const DrawerContext = createContext()

export function DrawerProvider({ children }) {
  const drawerWidth = 260
  const [open, setOpen] = useState(false)

  return <DrawerContext.Provider value={{ drawerWidth, open, setOpen }}>{children}</DrawerContext.Provider>
}

DrawerProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
