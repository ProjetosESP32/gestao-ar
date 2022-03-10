import { Inertia } from '@inertiajs/inertia'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import Paper from '@mui/material/Paper'
import React, { useState } from 'react'
import { MdAccountCircle, MdHome, MdOutlineSpeakerPhone } from 'react-icons/md'
import { useStyles } from '../Classes/Index'

const Navigation = () => {
  const [value, setValue] = useState(0)
  const classes = useStyles()

  const handleProfile = () => {
    Inertia.visit('/users/me')
  }
  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        className={classes.mobile}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue)
        }}
      >
        <BottomNavigationAction label='Início' icon={<MdHome size={36} />} />
        <BottomNavigationAction label='Controle' icon={<MdOutlineSpeakerPhone size={36} />} />
        <BottomNavigationAction onClick={handleProfile} label='Conta' icon={<MdAccountCircle size={36} />} />
      </BottomNavigation>
    </Paper>
  )
}

export default Navigation
