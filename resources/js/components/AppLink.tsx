import { InertiaLinkProps, Link } from '@inertiajs/inertia-react'
import { useTheme } from '@mui/material/styles'
import React, { FC } from 'react'
import { IconType } from 'react-icons/lib'

import '../../css/app-link.css'

interface AppLinkProps extends InertiaLinkProps {
  icon?: IconType
  children: string | number
}

export const AppLink: FC<AppLinkProps> = ({ icon: Icon, children, ...props }) => {
  const {
    palette: { mode, primary, secondary },
  } = useTheme()

  return (
    <Link
      {...props}
      style={{
        ...props.style,
        color: mode === 'dark' ? primary.main : secondary.main,
      }}
      className='app-link-component'
    >
      {Icon && <Icon size={24} />}
      <span>{children}</span>
    </Link>
  )
}
