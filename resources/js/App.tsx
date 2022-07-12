import { InertiaApp } from '@inertiajs/inertia-react'
import { InertiaProgress } from '@inertiajs/progress'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import React, { FC, useMemo } from 'react'
import { render } from 'react-dom'
import { InitialComponent } from './components/InitialComponent'
import { createAppTheme } from './theme'

import 'react-image-crop/dist/ReactCrop.css'
import '../css/app.css'

InertiaProgress.init()

const app = document.getElementById('app')!

const App: FC = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const theme = useMemo(() => createAppTheme(prefersDarkMode ? 'dark' : 'light'), [prefersDarkMode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <InertiaApp
        initialPage={JSON.parse(app.dataset.page!)}
        resolveComponent={name => import(`./pages/${name}`).then(module => module.default)}
        initialComponent={InitialComponent}
      />
    </ThemeProvider>
  )
}

render(<App />, app)
