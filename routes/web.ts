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
    Route.get('/verify-email/:email', 'UsersController.verifyEmail').mustBeSigned().as('users.verifyEmail')

    Route.get('/recover-password', 'UsersController.recoverPasswordView')
    Route.post('/recover-password', 'UsersController.recoverPassword').mustBeSigned()

    Route.get('/change-password/:email', 'UsersController.changePasswordView').mustBeSigned().as('users.changePassword')
    Route.post('/change-password/:email', 'UsersController.changePassword').mustBeSigned()
  }).prefix('users')

  Route.group(() => {
    Route.get('controle-sala', ({ inertia }) => inertia.render('Control/RoomControl'))
    Route.get('gerir-notificacoes', ({ inertia }) => inertia.render('Control/NotificationControl'))
    Route.get('controle-bloco', ({ inertia }) => inertia.render('Control/BlockControl'))
    Route.get('controle-salas', ({ inertia }) => inertia.render('Control/RoomsControl'))
  }).prefix('control')

  Route.group(() => {
    Route.delete('logout', 'AuthController.logout').prefix('auth')

    Route.group(() => {
      Route.get('/me', 'UsersController.show').as('users.profile')
      Route.put('/', 'UsersController.update')
      Route.patch('/password', 'UsersController.updatePassword')
    }).prefix('users')

    Route.group(() => {
      Route.get('/', 'RoomControlsController.index')
    }).prefix('rooms')

    Route.group(() => {
      Route.get('users', 'Admin/UsersController.index')
      Route.get('users/create', 'Admin/UsersController.create')
      Route.post('users/create', 'Admin/UsersController.store')
    }).prefix('admin')
  }).middleware(['auth:web'])
})
  .namespace('App/Controllers/Http/Web')
  .middleware(['inertia'])
