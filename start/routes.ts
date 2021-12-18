import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'Web/HomeController.index')

Route.group(() => {
  Route.post('/registro', 'Web/AuthController.store')
  Route.get('/login', 'Web/AuthController.loginForm')
  Route.post('/login', 'Web/AuthController.login')
}).prefix('auth')
