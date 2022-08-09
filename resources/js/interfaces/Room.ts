import { Esp } from './Esp'
import { Event } from './Event'

export interface Room {
  id: number
  name: string
  block: string
  floor: string
  createdAt: string
  updatedAt: string
  esps?: Esp[]
  events?: Event[]
}
