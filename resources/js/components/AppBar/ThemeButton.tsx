import { useThemeType } from '@/contexts/theme-type'
import IconButton from '@mui/material/IconButton'
import React from 'react'
import { MdNightsStay, MdWbSunny } from 'react-icons/md'

export const ThemeButton = () => {
  const { type, toggle } = useThemeType()

  return (
    <IconButton sx={{ width: 56, height: 56 }} onClick={toggle}>
      {type === 'light' ? <MdNightsStay /> : <MdWbSunny />}
    </IconButton>
  )
}
