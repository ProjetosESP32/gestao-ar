import { Event } from './Event'

export interface EventRecurrence {
  id: number
  eventId?: number
  daysOfWeekArray: number[]
  daysOfMonthArray: number[]
  startTime: string
  endTime: string
  createdAt: string
  updatedAt: string
  event?: Event
}
