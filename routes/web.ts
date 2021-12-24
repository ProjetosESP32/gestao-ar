import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('user', ({ inertia }) => inertia.render('User/Index'))
}).middleware('inertia')
