import { Esp } from './Esp'

export interface Consumption {
  id: number
  temperature: number
  humidity: number
  potency: number
  esp?: Esp
  createdAt: string
  updatedAt: string
}
