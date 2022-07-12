import React, { FC, ComponentType } from 'react'
import { Drawer } from './index'

export function withDrawer<T>(component: ComponentType<T>): FC<T> {
  const Component = component as any
  return props => (
    <Drawer>
      <Component {...props} />
    </Drawer>
  )
}
