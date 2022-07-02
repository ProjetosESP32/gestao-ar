import { BaseModel, BelongsTo, belongsTo, column, computed } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Event from './Event'

export default class EventRecurrence extends BaseModel {
  public static table = 'events_recurrences'

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

  public set daysOfWeekArray(value: number[]) {
    this.daysOfWeek = value.join(',')
  }

  @column({ serializeAs: null })
  public daysOfMonth: string

  @computed()
  public get daysOfMonthArray(): number[] {
    return this.daysOfMonth.split(',').map(Number)
  }

  public set daysOfMonthArray(value: number[]) {
    this.daysOfMonth = value.join(',')
  }

  @column.dateTime()
  public startTime: DateTime

  @column.dateTime()
  public endTime: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Event)
  public events: BelongsTo<typeof Event>
}
