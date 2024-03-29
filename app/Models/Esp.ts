import { BaseModel, beforeSave, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import EspStatus from './EspStatus'
import Room from './Room'

export default class Esp extends BaseModel {
  @column({ isPrimary: true })
  public id!: number

  @column()
  public roomId!: number

  @column()
  public name!: string

  @column()
  public macAddress!: string

  @column()
  public isOn!: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt!: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt!: DateTime

  @belongsTo(() => Room)
  public room!: BelongsTo<typeof Room>

  @hasMany(() => EspStatus)
  public status!: HasMany<typeof EspStatus>

  @beforeSave()
  public static clearMacAddress(esp: Esp) {
    if (esp.$dirty.macAddress) {
      esp.macAddress = esp.macAddress.replace(/[^0-9A-Fa-f]/g, '')
    }
  }
}
