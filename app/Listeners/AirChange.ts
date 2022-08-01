import type { EventsList } from '@ioc:Adonis/Core/Event'
import Esp from 'App/Models/Esp'
import Service from 'App/Models/Service'
import { io } from 'App/Services/WebSocket'

const FIVE_MINUTES_IN_HOURS = 5 / 60
const ONE_MINUTE_IN_HOURS = 1 / 60
const VOLTAGE = 220

export default class AirChange {
  public async onDispatch({ room, data }: EventsList['air-change:dispatch']) {
    await room.load('esps')
    const services = await Service.all()

    room.esps.forEach(({ macAddress }) => {
      services.forEach(({ token }) => {
        // projName property is used to identify the ESP project and should be always 'arCond' for this app
        io.to(token).volatile.emit('sendMessage', { remetente: macAddress, mensagem: data, projName: 'arCond' })
      })
    })
  }

  public async onDispatchAll(eventData: EventsList['air-change:dispatchAll']) {
    const services = await Service.all()

    eventData.forEach(({ esps, data }) => {
      esps.forEach(({ macAddress }) => {
        services.forEach(({ token }) => {
          // projName property is used to identify the ESP project and should be always 'arCond' for this app
          io.to(token).volatile.emit('sendMessage', { destinatario: macAddress, mensagem: data, projName: 'arCond' })
        })
      })
    })
  }

  public async onReceive({
    destinatario,
    mensagem: { irms, humidade, temperatura },
  }: EventsList['air-change:receive']) {
    const esp = await Esp.firstOrCreate({ macAddress: destinatario.replace(/[^0-9A-Fa-f]/g, '') })

    if (irms === 0) {
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

    const lastConsumption = await esp.related('consumptions').query().orderBy('created_at', 'desc').first()
    const baseTime = lastConsumption?.createdAt.diffNow('hour').hours ?? 0
    const time = -FIVE_MINUTES_IN_HOURS < baseTime && baseTime < 0 ? -baseTime : ONE_MINUTE_IN_HOURS

    const potency = (VOLTAGE * irms * time) / 1000 // in kWh
    await esp.related('consumptions').create({ humidity: humidade, temperature: temperatura, potency })
  }
}
