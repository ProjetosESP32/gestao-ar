import Event, { EventsList } from '@ioc:Adonis/Core/Event'
import Logger from '@ioc:Adonis/Core/Logger'
import { Exception } from '@poppinss/utils'
import Service from 'App/Models/Service'
import { boot, io } from 'App/Services/WebSocket'

boot()

io.use(async (socket, next) => {
  const { token } = socket.handshake.auth

  if (!token) {
    return next(new Exception('No Auth Token', 401, 'E_AUTH_ERROR'))
  }

  const serviceByToken = await Service.findBy('token', token)

  if (!serviceByToken) {
    return next(new Exception('Invalid Auth Token', 401, 'E_AUTH_ERROR'))
  }

  next()
})

io.on('connection', socket => {
  const { token } = socket.handshake.auth

  socket.join(token)

  socket.on('gateway-message', async (data: EventsList['air-change:receive']) => {
    try {
      await Event.emit('air-change:receive', data)
    } catch (err) {
      Logger.error(err, 'gateway-message error')
    }
  })
})
