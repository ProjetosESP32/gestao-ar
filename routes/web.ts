import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'HomeController.index')

  Route.group(() => {
    Route.get('login', 'AuthController.loginForm')
    Route.post('login', 'AuthController.login')

    Route.get('register', 'AuthController.registerForm')
    Route.post('register', 'AuthController.register')
  }).prefix('auth')

  Route.group(() => {
    Route.get('/me', 'UsersController.show').as('users.profile')
    Route.put('/', 'UsersController.update')
    Route.patch('/password', 'UsersController.updatePassword')

    Route.get('/verify-email/:email', 'UsersController.verifyEmail').mustBeSigned().as('users.verifyEmail')

    Route.get('/recover-password', 'UsersController.recoverPasswordView')
    Route.post('/recover-password', 'UsersController.recoverPassword')

    Route.get('/change-password/:email', 'UsersController.changePasswordView').as('users.changePassword')
    Route.post('/change-password/:email', 'UsersController.changePassword').mustBeSigned()
  }).prefix('users')

  Route.group(() => {
    Route.delete('logout', 'AuthController.logout').prefix('auth')
  }).middleware(['auth:web'])
})
  .namespace('App/Controllers/Http/Web')
  .middleware(['inertia'])
