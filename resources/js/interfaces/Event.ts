import { EventRecurrence } from './EventRecurrence'
import { Room } from './Room'

export interface Event {
  id: number
  roomId?: number
  name: string
  description: string
  startDate: string
  endDate: string
  createdAt: string
  updatedAt: string
  room?: Room
  eventRecurrences?: EventRecurrence[]
}
