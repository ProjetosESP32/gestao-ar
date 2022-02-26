import { PageProps } from '@inertiajs/inertia'
import { createInertiaApp, SetupOptions } from '@inertiajs/inertia-react'
import { InertiaProgress } from '@inertiajs/progress'
import { CssBaseline, ThemeProvider } from '@mui/material'
import React, { FC } from 'react'
import { render } from 'react-dom'
import '../css/global.css'
import '../css/midia.css'
import { DrawerProvider } from './providers/drawer.jsx'
import { theme } from './theme'

InertiaProgress.init()

type AppProps = Omit<SetupOptions<HTMLElement, PageProps>, 'el'>

const App: FC<AppProps> = ({ App: Page, props }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Page {...props} />
  </ThemeProvider>
)

createInertiaApp({
  resolve: name => require(`./pages/${name}`),
  setup({ el, ...props }) {
    render(<App {...props} />, el)
  },
})
