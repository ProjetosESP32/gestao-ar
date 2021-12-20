import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'Web/HomeController.index')
  Route.get('/users/verify-email/:email', 'Web/UsersController.verifyEmail').mustBeSigned().as('user.verifyEmail')

  Route.group(() => {
    Route.get('/register', 'Web/AuthController.registerForm')
    Route.post('/register', 'Web/AuthController.register')

    Route.get('/login', 'Web/AuthController.loginForm')
    Route.post('/login', 'Web/AuthController.login')
  }).prefix('auth')

  Route.group(() => {
    Route.group(() => {
      Route.delete('/logout', 'Web/AuthController.logout')
    }).prefix('auth')

    Route.group(() => {
      Route.get('/', 'Web/UsersController.show').as('profile')
      Route.patch('/cover', 'Web/UsersController.storeCover')
      Route.route('/update', ['PUT', 'PATCH'], 'Web/UsersController.update')
    }).prefix('users')
  }).middleware('auth:web')
}).middleware('inertia')
