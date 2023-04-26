import Server from '@ioc:Adonis/Core/Server'

Server.middleware.register([
  () => import('@ioc:Adonis/Core/BodyParser'),
  () => import('@ioc:Adonis/Addons/Shield'),
  () => import('App/Middleware/SilentAuth'),
])

Server.middleware.registerNamed({
  auth: () => import('App/Middleware/Auth'),
  guest: () => import('App/Middleware/Guest'),
  inertia: () => import('@ioc:EidelLev/Inertia/Middleware'),
  throttle: () => import('@adonisjs/limiter/build/throttle'),
})
