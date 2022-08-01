import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'HomeController.index').as('home')
  Route.get('auth/google/callback', 'GoogleAuthController.store').as('google.callback')
  Route.get('users/verify-email/:email', 'UsersController.verifyEmail').mustBeSigned().as('users.verifyEmail')
  Route.get('rooms', 'RoomsController.index')
  Route.get('rooms/control/:id', 'RoomControlsController.show')
})
  .namespace('App/Controllers/Http/Web')
  .middleware(['inertia', 'throttle:global'])

Route.group(() => {
  Route.group(() => {
    Route.get('login', 'AuthLoginController.create').as('login.create')
    Route.post('login', 'AuthLoginController.store').as('login')
    Route.get('register', 'AuthRegisterController.create').as('register.create')
    Route.post('register', 'AuthRegisterController.store').as('register')
    Route.get('google/redirect', 'GoogleAuthController.create').as('google.redirect')
  })
    .prefix('auth')
    .as('auth')

  Route.group(() => {
    Route.get('recover-password', 'UserRecoveriesController.create')
    Route.post('recover-password', 'UserRecoveriesController.store')

    Route.get('change-password/:email', 'UserRecoveriesController.edit').mustBeSigned().as('users.changePassword')
    Route.post('change-password/:email', 'UserRecoveriesController.update').mustBeSigned()
  }).prefix('users')
})
  .namespace('App/Controllers/Http/Web')
  .middleware(['inertia', 'guest', 'throttle:global'])

Route.group(() => {
  Route.delete('logout', 'AuthLoginController.destroy').prefix('auth').as('auth.logout')

  Route.group(() => {
    Route.get('me', 'UsersController.show').as('users.profile')
    Route.put('/', 'UsersController.update')
    Route.patch('password', 'UsersController.updatePassword')
    Route.delete('photo', 'UsersController.deletePhoto')
    Route.get('link-google', 'UsersController.linkGoogleAccount')
  }).prefix('users')
})
  .namespace('App/Controllers/Http/Web')
  .middleware(['inertia', 'auth:web', 'throttle:global'])

Route.group(() => {
  Route.post('rooms/control/:id/temperature', 'RoomControlsController.changeTemperature')
  Route.post('rooms/control/:id/power', 'RoomControlsController.changePower')
})
  .namespace('App/Controllers/Http/Web')
  .middleware(['auth:web', 'throttle:global'])

Route.group(() => {
  Route.resource('users', 'UsersController').except(['edit'])
  Route.delete('users/:id/detach-room/:roomId', 'UsersController.detachRoom').as('users.detachRoom')
  Route.resource('rooms', 'RoomsController').only(['store', 'update', 'destroy'])
  Route.resource('apis', 'ServiceApiKeysController').except(['create', 'show', 'edit'])
  Route.resource('esps', 'EspsController').only(['index', 'update', 'destroy'])
})
  .namespace('App/Controllers/Http/Web/Admin')
  .middleware(['inertia', 'auth:web', 'throttle:global'])
  .prefix('admin')
  .as('admin')
