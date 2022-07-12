import { Esp } from './Esp'

export interface Room {
  id: number
  name: string
  block: string
  floor: string
  createdAt: string
  updatedAt: string
  esps?: Esp[]
}
