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

    Route.get('conta', ({ inertia }) => inertia.render('User/UserAccount'))
    Route.get('lista-usuarios', ({ inertia }) => inertia.render('User/UserList'))
    Route.get('cadastro', ({ inertia }) => inertia.render('User/UserRegister'))
  }).prefix('users')

  Route.group(() => {
    Route.get('controle-sala', ({ inertia }) => inertia.render('Control/RoomControl'))
    Route.get('gerir-notificacoes', ({ inertia }) => inertia.render('Control/NotificationControl'))
    Route.get('controle-bloco', ({ inertia }) => inertia.render('Control/BlockControl'))
    Route.get('controle-salas', ({ inertia }) => inertia.render('Control/RoomsControl'))
  }).prefix('control')

  Route.group(() => {
    Route.delete('logout', 'AuthController.logout').prefix('auth')
  }).middleware(['auth:web'])
})
  .namespace('App/Controllers/Http/Web')
  .middleware(['inertia'])
