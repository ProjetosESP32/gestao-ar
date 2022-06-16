import AdonisServer from '@ioc:Adonis/Core/Server'
import { Server } from 'socket.io'

let isBooted = false
export let io: Server

export const boot = () => {
  if (isBooted) {
    return
  }

  isBooted = true
  io = new Server(AdonisServer.instance!, { cors: { origin: '*' } })
}
