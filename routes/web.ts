import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'HomeController.index').as('home')

  Route.group(() => {
    Route.get('login', 'AuthLoginController.create').as('login.create')
    Route.post('login', 'AuthLoginController.store').as('login')
    Route.get('register', 'AuthRegisterController.create').as('register.create')
    Route.post('register', 'AuthRegisterController.store').as('register')
    Route.get('google/redirect', 'GoogleAuthController.create').as('google.redirect')
    Route.get('google/callback', 'GoogleAuthController.store').as('google.callback')
  })
    .prefix('auth')
    .as('auth')
    .middleware('redirectIfAuthenticated')

  Route.group(() => {
    Route.get('verify-email/:email', 'UsersController.verifyEmail').mustBeSigned().as('users.verifyEmail')

    Route.get('recover-password', 'UserRecoveriesController.create')
    Route.post('recover-password', 'UserRecoveriesController.store')

    Route.get('change-password/:email', 'UserRecoveriesController.edit').mustBeSigned().as('users.changePassword')
    Route.post('change-password/:email', 'UserRecoveriesController.update').mustBeSigned()
  }).prefix('users')

  Route.group(() => {
    Route.inertia('gerir-notificacoes', 'Control/NotificationControl')
  }).prefix('control')

  Route.resource('rooms', 'RoomsController').only(['index'])
  Route.resource('rooms/control', 'RoomControlsController').only(['show'])

  Route.group(() => {
    Route.delete('logout', 'AuthLoginController.destroy').prefix('auth').as('auth.logout')

    Route.group(() => {
      Route.get('me', 'UsersController.show').as('users.profile')
      Route.put('/', 'UsersController.update')
      Route.patch('password', 'UsersController.updatePassword')
    }).prefix('users')

    Route.group(() => {
      Route.resource('users', 'UsersController').except(['edit'])
      Route.delete('users/:id/detach-room/:roomId', 'UsersController.detachRoom').as('users.detachRoom')
      Route.resource('rooms', 'RoomsController').only(['store', 'update', 'destroy'])
      Route.resource('apis', 'ServiceApiKeysController').except(['create', 'show', 'edit'])
      Route.resource('esps', 'EspsController').only(['index', 'update', 'destroy'])
    })
      .namespace('App/Controllers/Http/Web/Admin')
      .prefix('admin')
      .as('admin')
  }).middleware(['auth:web'])
})
  .namespace('App/Controllers/Http/Web')
  .middleware(['inertia'])

Route.group(() => {
  Route.post('rooms/control/:id/temperature', 'RoomControlsController.changeTemperature')
  Route.post('rooms/control/:id/power', 'RoomControlsController.changePower')
})
  .namespace('App/Controllers/Http/Web')
  .middleware(['auth:web'])
