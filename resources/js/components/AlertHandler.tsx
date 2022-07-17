import { usePage } from '@inertiajs/inertia-react'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import React, { FC, ReactNode, useEffect, useState } from 'react'
import { AlertData } from '@/interfaces/AlertData'
import { BasePageProps } from '@/interfaces/BasePageProps'

interface AlertPage {
  alert?: AlertData
}

type AlertPageProps = BasePageProps<AlertPage>

interface AlertHandlerProps {
  children: ReactNode
}

export const AlertHandler: FC<AlertHandlerProps> = ({ children }) => {
  const { alert } = usePage<AlertPageProps>().props
  const [isOpen, setIsOpen] = useState(false)

  const handleClose = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    if (alert) {
      setIsOpen(true)
    }
  }, [alert])

  return (
    <>
      <Snackbar
        open={isOpen}
        autoHideDuration={10000}
        onClose={handleClose}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <Alert severity={alert?.severity} onClose={handleClose} sx={{ width: '100%' }} variant='filled' elevation={6}>
          {alert?.message}
        </Alert>
      </Snackbar>
      {children}
    </>
  )
}
