import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'Web/HomeController.index')

  Route.group(() => {
    Route.get('login', 'Web/AuthController.loginForm')
    Route.post('login', 'Web/AuthController.login')

    Route.get('register', 'Web/AuthController.registerForm')
    Route.post('register', 'Web/AuthController.register')
  }).prefix('auth')

  Route.group(() => {
    Route.get('/me', 'Web/UsersController.show').as('users.profile')
    Route.put('/', 'Web/UsersController.update')
    Route.patch('/password', 'Web/UsersController.updatePassword')

    Route.get('/verify-email/:email', 'Web/UsersController.verifyEmail').mustBeSigned().as('users.verifyEmail')

    Route.get('/recover-password', 'Web/UsersController.recoverPasswordView')
    Route.post('/recover-password', 'Web/UsersController.recoverPassword')

    Route.get('/change-password/:email', 'Web/UsersController.changePasswordView').as('users.changePassword')
    Route.post('/change-password/:email', 'Web/UsersController.changePassword').mustBeSigned()
  }).prefix('users')

  Route.group(() => {
    Route.delete('logout', 'Web/AuthController.logout').prefix('auth')
  }).middleware(['auth:web'])
}).middleware('inertia')
