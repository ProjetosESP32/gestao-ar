import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Esp from './Esp'

export default class Consumption extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public espId: number

  @column()
  public temperature: number

  @column()
  public humidity: number

  @column()
  public potency: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Esp)
  public esp: BelongsTo<typeof Esp>
}
