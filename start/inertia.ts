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
  alert: ({ session }) => session.flashMessages.get('alert'),
  loggedUser: ({ auth }) => auth.use('web').user,
}).version(() => Inertia.manifestFile('public/assets/manifest.json'))
