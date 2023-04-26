import type { EventsList } from '@ioc:Adonis/Core/Event'
import Esp from 'App/Models/Esp'
import Service from 'App/Models/Service'
import { io } from 'App/Services/WebSocket'

export default class AirChange {
  public async onDispatch({ room, data }: EventsList['air-change:dispatch']) {
    await room.load('esps')
    const services = await Service.all()

    room.esps.forEach(({ macAddress }) => {
      services.forEach(({ token }) => {
        io.to(token).volatile.emit('server-message', { recipientMAC: macAddress, message: data })
      })
    })
  }

  public async onDispatchAll(eventData: EventsList['air-change:dispatchAll']) {
    const services = await Service.all()

    eventData.forEach(({ esps, data }) => {
      esps.forEach(({ macAddress }) => {
        services.forEach(({ token }) => {
          io.to(token).volatile.emit('server-message', { recipientMAC: macAddress, message: data })
        })
      })
    })
  }

  public async onReceive({
    consumption,
    humidity,
    issuerMAC,
    temperature,
    current,
    potencyFactor,
    voltage,
  }: EventsList['air-change:receive']) {
    const esp = await Esp.firstOrCreate({ macAddress: issuerMAC.replace(/[^0-9A-Fa-f]/g, '') })

    if (consumption === 0) {
      if (esp.isOn) {
        esp.isOn = false
        await esp.save()
      }

      return
    }

    if (!esp.isOn) {
      esp.isOn = true
      await esp.save()
    }

    await esp.related('status').create({ humidity, temperature, consumption, current, potencyFactor, voltage })
  }
}
