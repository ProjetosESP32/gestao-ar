import React, { FC, ComponentType } from 'react'
import { Drawer } from './index'

export function withDrawer<T extends JSX.IntrinsicAttributes>(Component: ComponentType<T>): FC<T> {
  return props => (
    <Drawer>
      <Component {...props} />
    </Drawer>
  )
}
