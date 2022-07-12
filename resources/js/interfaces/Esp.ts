import { Consumption } from './Consumption'

export interface Esp {
  id: number
  name: string
  macAddress: string
  isOn: boolean
  consumptions?: Consumption[]
  createdAt: string
  updatedAt: string
}
