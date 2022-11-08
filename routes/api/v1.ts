import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('home', 'HomeController.index')

  Route.group(() => {
    Route.post('login', 'AuthController.login')
    Route.post('register', 'AuthController.register')
  }).prefix('auth')

  Route.post('auth/google', 'GoogleAuthController.store')

  Route.group(() => {
    Route.delete('logout', 'AuthController.logout').prefix('auth')

    Route.get('rooms', 'RoomsController.index')
    Route.get('rooms/control/:id', 'RoomControlsController.show')
    Route.post('rooms/control/:id/temperature', 'RoomControlsController.changeTemperature')
    Route.post('rooms/control/:id/power', 'RoomControlsController.changePower')

    Route.group(() => {
      Route.get('me', 'UsersController.show')
      Route.route('/', ['PUT', 'PATCH'], 'UsersController.update')
      Route.patch('/password', 'UsersController.updatePassword')
      Route.delete('/', 'UsersController.destroy')
    }).prefix('users')
  }).middleware(['auth:api'])
})
  .namespace('App/Controllers/Http/Api/V1')
  .middleware(['throttle:global'])
  .prefix('api/v1')
