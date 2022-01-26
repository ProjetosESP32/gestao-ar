import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.post('login', 'Api/AuthController.login')
    Route.post('register', 'Api/AuthController.register')
  }).prefix('auth')

  Route.group(() => {
    Route.post('logout', 'Api/AuthController.logout').prefix('auth')

    Route.group(() => {
      Route.get('me', 'Api/UsersController.show')
      Route.route('/', ['PUT', 'PATCH'], 'Api/UsersController.update')
      Route.patch('/password', 'Api/UsersController.updatePassword')
      Route.post('/recover-password', 'Api/UsersController.recoverPassword')
      Route.delete('/', 'Api/UsersController.destroy')
    }).prefix('users')
  }).middleware(['auth:api'])
}).prefix('api')
