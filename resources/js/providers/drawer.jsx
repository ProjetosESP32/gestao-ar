import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'

// @ts-ignore
export const DrawerContext = React.createContext()

/**
 * @param {{ children: any  }} props
 */
export function DrawerProvider(props) {
  const drawerWidth = 260
  const [open, setOpen] = useState(false)

  return <DrawerContext.Provider value={{ drawerWidth, open, setOpen }}>{props.children}</DrawerContext.Provider>
}

DrawerProvider.propTypes = {
  children: PropTypes.any,
}
