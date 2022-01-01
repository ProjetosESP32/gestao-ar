import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('user', ({ inertia }) => inertia.render('User/Index'))
  Route.get('', ({ inertia }) => inertia.render('Login/Index'))
  Route.get('/alterar-senha', ({ inertia }) => inertia.render('ChangePassword/Index'))
}).middleware('inertia')
