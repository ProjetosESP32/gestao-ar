import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'HomeController.index')

  Route.group(() => {
    Route.inertia('403', 'Error/403')
    Route.inertia('404', 'Error/404')
    Route.inertia('500', 'Error/500')
  }).prefix('errors')

  Route.group(() => {
    Route.get('login', 'AuthController.loginForm')
    Route.post('login', 'AuthController.login')

    Route.get('register', 'AuthController.registerForm')
    Route.post('register', 'AuthController.register')
  }).prefix('auth')

  Route.group(() => {
    Route.get('verify-email/:email', 'UsersController.verifyEmail').mustBeSigned().as('users.verifyEmail')

    Route.get('recover-password', 'UsersController.recoverPasswordView')
    Route.post('recover-password', 'UsersController.recoverPassword').mustBeSigned()

    Route.get('change-password/:email', 'UsersController.changePasswordView').mustBeSigned().as('users.changePassword')
    Route.post('change-password/:email', 'UsersController.changePassword').mustBeSigned()
  }).prefix('users')

  Route.group(() => {
    Route.get('controle-sala', ({ inertia }) => inertia.render('Control/RoomControl'))
    Route.get('gerir-notificacoes', ({ inertia }) => inertia.render('Control/NotificationControl'))
    Route.get('controle-bloco', ({ inertia }) => inertia.render('Control/BlockControl'))
  }).prefix('control')

  Route.resource('rooms', 'RoomsController').only(['index', 'show'])

  Route.group(() => {
    Route.delete('logout', 'AuthController.logout').prefix('auth')

    Route.group(() => {
      Route.get('me', 'UsersController.show').as('users.profile')
      Route.put('/', 'UsersController.update')
      Route.patch('password', 'UsersController.updatePassword')
    }).prefix('users')

    Route.group(() => {
      Route.resource('users', 'UsersController')
      Route.resource('rooms', 'RoomsController').only(['store', 'update', 'destroy'])
    })
      .namespace('App/Controllers/Http/Web/Admin')
      .prefix('admin')
      .as('admin')
  }).middleware(['auth:web'])
})
  .namespace('App/Controllers/Http/Web')
  .middleware(['inertia'])
