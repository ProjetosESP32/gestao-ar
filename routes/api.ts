import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.post('login', 'AuthController.login')
    Route.post('register', 'AuthController.register')
  }).prefix('auth')

  Route.group(() => {
    Route.delete('logout', 'AuthController.logout').prefix('auth')

    Route.group(() => {
      Route.get('me', 'UsersController.show')
      Route.route('/', ['PUT', 'PATCH'], 'UsersController.update')
      Route.patch('/password', 'UsersController.updatePassword')
      Route.post('/recover-password', 'UsersController.recoverPassword')
      Route.delete('/', 'UsersController.destroy')
    }).prefix('users')
  }).middleware(['auth:api'])
})
  .namespace('App/Controllers/Http/Api')
  .prefix('api')
