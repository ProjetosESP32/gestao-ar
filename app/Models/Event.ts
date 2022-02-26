import { BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Room from './Room'
import { SoftDeletesBaseModel } from 'App/Utils/SoftDeletes'

export default class Event extends SoftDeletesBaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public roomId: number

  @column()
  public name: string

  @column()
  public description: string

  @column.dateTime()
  public startDate: DateTime

  @column.dateTime()
  public endDate: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Room)
  public room: BelongsTo<typeof Room>
}
