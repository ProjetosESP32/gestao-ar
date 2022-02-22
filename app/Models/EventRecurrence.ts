import { BaseModel, column, computed } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

export default class EventRecurrence extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public eventId: number

  @column({ serializeAs: null })
  public daysOfWeek: string

  @computed()
  public get daysOfWeekArray(): number[] {
    return this.daysOfWeek.split(',').map(Number)
  }

  @column({ serializeAs: null })
  public daysOfMonth: string

  @computed()
  public get daysOfMonthArray(): number[] {
    return this.daysOfMonth.split(',').map(Number)
  }

  @column()
  public startTime: string

  @column()
  public endTime: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
