/*
|--------------------------------------------------------------------------
| Inertia Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

import Inertia from '@ioc:EidelLev/Inertia'

Inertia.share({
  errors: ({ session }) => session.flashMessages.get('errors'),
  user: ({ auth }) => auth.user,
}).version(() => Inertia.manifestFile('public/assets/manifest.json'))
