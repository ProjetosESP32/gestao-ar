import { InertiaApp } from '@inertiajs/inertia-react'
import { InertiaProgress } from '@inertiajs/progress'
import React, { FC } from 'react'
import { createRoot } from 'react-dom/client'
import { AlertHandler } from './components/AlertHandler'
import { InitialComponent } from './components/InitialComponent'
import { ThemeTypeProvider } from './contexts/theme-type'

import 'react-image-crop/dist/ReactCrop.css'
import '../css/app.css'

InertiaProgress.init()

const appContainer = document.getElementById('app')!

const App: FC = () => (
  <ThemeTypeProvider>
    <InertiaApp
      initialPage={JSON.parse(appContainer.dataset.page!)}
      resolveComponent={name => import(`./pages/${name}`).then(module => module.default)}
      initialComponent={InitialComponent as any}
    >
      {({ Component }) => (
        <AlertHandler>
          <Component />
        </AlertHandler>
      )}
    </InertiaApp>
  </ThemeTypeProvider>
)

const appRoot = createRoot(appContainer)
appRoot.render(<App />)
