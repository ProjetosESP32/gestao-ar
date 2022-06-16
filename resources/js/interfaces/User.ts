import { DateTime } from 'luxon'
import { Attachment } from './Attachment'

export interface User {
  id: number
  username: string
  email: string
  isRoot: boolean
  cover?: Attachment | null
  emailVerifiedAt?: DateTime | null
  createdAt: DateTime
  updatedAt: DateTime
}
