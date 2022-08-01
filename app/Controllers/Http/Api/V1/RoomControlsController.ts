import Event from '@ioc:Adonis/Core/Event'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Room from 'App/Models/Room'
import { io } from 'App/Services/WebSocket'
import TemperatureValidator from 'App/Validators/TemperatureValidator'

export default class RoomControlsController {
  public async show({ bouncer, params }: HttpContextContract) {
    const room = await Room.query()
      .where('id', params.id)
      .preload('esps', espBuilder => {
        espBuilder.preload('consumptions', consumptionBuilder => {
          consumptionBuilder.select('*').max('created_at')
        })
      })
      .firstOrFail()

    const canEdit = await bouncer.allows('updateRoom', room)

    const sockets = await io.allSockets()
    const hasServices = sockets.size > 0

    return { hasServices, canEdit, room }
  }

  public async changePower({ bouncer, params }: HttpContextContract) {
    const room = await Room.findOrFail(params.id)
    await bouncer.authorize('updateRoom', room)

    await room.load('esps')
    const power = room.esps.some(({ isOn }) => isOn) ? 0 : 1

    await Event.emit('air-change:dispatch', { room, data: power })
  }

  public async changeTemperature({ request, bouncer, params }: HttpContextContract) {
    const room = await Room.findOrFail(params.id)
    await bouncer.authorize('updateRoom', room)

    const { temperature } = await request.validate(TemperatureValidator)

    await Event.emit('air-change:dispatch', { room, data: temperature })
  }
}
