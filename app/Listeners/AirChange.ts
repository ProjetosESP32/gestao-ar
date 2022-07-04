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
        // projName property is used to identify the ESP project and should be always 'arCond' for this app
        io.to(token).emit('sendMessage', { remetente: macAddress, mensagem: data, projName: 'arCond' })
      })
    })
  }

  public async onDispatchAll(eventData: EventsList['air-change:dispatchAll']) {
    const services = await Service.all()

    eventData.forEach(({ esps, data }) => {
      esps.forEach(({ macAddress }) => {
        services.forEach(({ token }) => {
          // projName property is used to identify the ESP project and should be always 'arCond' for this app
          io.to(token).emit('sendMessage', { remetente: macAddress, mensagem: data, projName: 'arCond' })
        })
      })
    })
  }

  public async onReceive({
    destinatario,
    mensagem: { humidade, kwhTotal, temperatura },
  }: EventsList['air-change:receive']) {
    const esp = await Esp.firstOrCreate({ macAddress: destinatario })

    await esp.related('consumptions').create({ humidity: humidade, potency: kwhTotal, temperature: temperatura })
  }
}
