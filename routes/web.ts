import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'HomeController.index').as('home')

  Route.group(() => {
    Route.inertia('403', 'Error/403')
    Route.inertia('404', 'Error/404')
    Route.inertia('500', 'Error/500')
  }).prefix('errors')

  Route.group(() => {
    Route.get('login', 'AuthLoginController.create').as('login.create')
    Route.post('login', 'AuthLoginController.store').as('login')
    Route.get('register', 'AuthRegisterController.create').as('register.create')
    Route.post('register', 'AuthRegisterController.store').as('register')
  })
    .prefix('auth')
    .as('auth')

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

  Route.group(() => {
    Route.resource('/', 'RoomsController').only(['index'])
    Route.resource('/control', 'RoomControlsController').only(['show'])
  })
    .prefix('rooms')
    .as('rooms')

  Route.group(() => {
    Route.delete('logout', 'AuthLoginController.destroy').prefix('auth').as('auth.logout')

    Route.group(() => {
      Route.get('me', 'UsersController.show').as('users.profile')
      Route.put('/', 'UsersController.update')
      Route.patch('password', 'UsersController.updatePassword')
    }).prefix('users')

    Route.group(() => {
      Route.resource('users', 'UsersController')
      Route.group(() => {
        Route.resource('/', 'RoomsController').only(['store', 'update', 'destroy'])
        Route.resource(':roomId/esps', 'RoomEspsController').only(['store', 'destroy'])
      })
        .prefix('rooms')
        .as('rooms')
    })
      .namespace('App/Controllers/Http/Web/Admin')
      .prefix('admin')
      .as('admin')
  }).middleware(['auth:web'])
})
  .namespace('App/Controllers/Http/Web')
  .middleware(['inertia'])
