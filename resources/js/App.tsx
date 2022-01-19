import { createInertiaApp } from '@inertiajs/inertia-react'
import { CssBaseline } from '@mui/material'
import React from 'react'
import { render } from 'react-dom'

import '../css/global.css'
import '../css/midia.css'
import { DrawerProvider } from './providers/drawer.jsx'

createInertiaApp({
  resolve: name => require(`./pages/${name}`),
  setup({ el, App, props }) {
    render(
      <>
        <DrawerProvider>
          <CssBaseline />
          <App {...props} />
        </DrawerProvider>
      </>,
      el
    )
  },
})
