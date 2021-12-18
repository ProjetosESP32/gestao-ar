import Route from '@ioc:Adonis/Core/Route';

Route.get('/', 'Web/HomeController.index');

Route.post('/registro', 'AuthController/Auth.registro').as('registro');
Route.get('/autenticacao', 'AuthController/Auth.autenticacao');
