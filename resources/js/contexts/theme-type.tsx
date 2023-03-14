import { createAppTheme } from '@/theme'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import React, { FC, ReactNode, createContext, useContext, useState } from 'react'

interface ThemeTypeContext {
  type: 'light' | 'dark'
  toggle: () => void
}

interface ThemeTypeProviderProps {
  children: ReactNode
}

const THEME_KEY = 'gestao-ar-theme'
const themeContext = createContext<ThemeTypeContext | null>(null)

export const ThemeTypeProvider: FC<ThemeTypeProviderProps> = ({ children }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const [themeType, setThemeType] = useState<ThemeTypeContext['type']>(() => {
    const storageTheme = localStorage.getItem(THEME_KEY)

    if (storageTheme === 'light' || storageTheme === 'dark') {
      return storageTheme
    }

    return prefersDarkMode ? 'dark' : 'light'
  })
  const theme = createAppTheme(themeType)

  const toggle = () => {
    if (themeType === 'light') {
      setThemeType('dark')
      localStorage.setItem(THEME_KEY, 'dark')
      return
    }

    setThemeType('light')
    localStorage.setItem(THEME_KEY, 'light')
  }

  return (
    <themeContext.Provider value={{ type: themeType, toggle }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </themeContext.Provider>
  )
}

export const useThemeType = () => {
  const context = useContext(themeContext)

  if (!context) throw new Error('useThemeType must be used with ThemeTypeProvider')

  return context
}
