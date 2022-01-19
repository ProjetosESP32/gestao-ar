import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('user', ({ inertia }) => inertia.render('User/Index'))
  Route.get('login', ({ inertia }) => inertia.render('Login/Index'))
  Route.get('alterar-senha', ({ inertia }) => inertia.render('ChangePassword/Index'))
  Route.get('recuperar-senha', ({ inertia }) => inertia.render('RecoverPassword/Index'))
  Route.get('inicio', ({ inertia }) => inertia.render('Home/Index'))
}).middleware('inertia')
