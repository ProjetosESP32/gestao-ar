import { Consumption } from './Consumption'
import { Room } from './Room'

export interface Esp {
  id: number
  roomId?: number
  name: string
  macAddress: string
  isOn: boolean
  consumptions?: Consumption[]
  room?: Room
  createdAt: string
  updatedAt: string
}
