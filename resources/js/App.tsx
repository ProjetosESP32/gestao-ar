import { PageProps } from '@inertiajs/inertia'
import { createInertiaApp, SetupOptions } from '@inertiajs/inertia-react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import React, { FC } from 'react'
import { render } from 'react-dom'
import { theme } from './theme'

import '../css/global.css'
import '../css/midia.css'

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
