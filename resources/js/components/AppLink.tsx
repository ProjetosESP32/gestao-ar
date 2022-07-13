import { InertiaLinkProps, Link } from '@inertiajs/inertia-react'
import { useTheme } from '@mui/material'
import React, { FC, ReactText } from 'react'
import { IconType } from 'react-icons/lib'

import '../../css/app-link.css'

interface AppLinkProps extends InertiaLinkProps {
  icon?: IconType
  children: ReactText
}

export const AppLink: FC<AppLinkProps> = ({ icon: Icon, children, ...props }) => {
  const theme = useTheme()

  return (
    <Link
      {...props}
      style={{
        ...props.style,
        color: theme.palette.primary.main,
      }}
      className='app-link-component'
    >
      {Icon && <Icon size={24} />}
      <span>{children}</span>
    </Link>
  )
}
