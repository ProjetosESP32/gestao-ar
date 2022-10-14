import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Schedule from './Schedule'

export default class ScheduleException extends BaseModel {
  @column({ isPrimary: true })
  public id!: number

  @column()
  public scheduleId!: number

  @column()
  public exceptionDate!: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt!: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt!: DateTime

  @belongsTo(() => Schedule)
  public schedule!: BelongsTo<typeof Schedule>
}
