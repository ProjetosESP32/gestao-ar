import { BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Consumption from './Consumption'
import Room from './Room'
import { SoftDeletesBaseModel } from 'App/Utils/SoftDeletes'

export default class Esp extends SoftDeletesBaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public roomId: number

  @column()
  public name: string

  @column()
  public macAddress: string

  @column()
  public isOn: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Room)
  public room: BelongsTo<typeof Room>

  @hasMany(() => Consumption)
  public consumptions: HasMany<typeof Consumption>
}
