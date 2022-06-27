import type { EventsList } from '@ioc:Adonis/Core/Event'
import Service from 'App/Models/Service'
import { io } from 'App/Services/WebSocket'

export default class AirChange {
  public async onTempChange({ room, temperature }: EventsList['air-change:temperature']) {
    await room.load('esps')
    const services = await Service.all()

    room.esps.forEach(({ macAddress }) => {
      services.forEach(({ token }) => {
        io.to(token).emit('change:temperature', { esp: macAddress, temperature })
      })
    })
  }

  public async onPowerChange({ room, power }: EventsList['air-change:power']) {
    await room.load('esps')
    const services = await Service.all()

    room.esps.forEach(({ macAddress }) => {
      services.forEach(({ token }) => {
        io.to(token).emit('change:power', { esp: macAddress, power })
      })
    })
  }
}
