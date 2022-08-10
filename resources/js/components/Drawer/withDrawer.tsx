import React, { FC, ComponentType } from 'react'
import { Drawer } from './index'

export function withDrawer<T extends JSX.IntrinsicAttributes>(Component: ComponentType<T>): FC<T> {
  const WithDrawerComponent: FC<T> = props => (
    <Drawer>
      <Component {...props} />
    </Drawer>
  )

  return WithDrawerComponent
}
