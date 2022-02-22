import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Tax extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public tax: number

  @column.dateTime()
  public startOfTerm: DateTime

  @column.dateTime()
  public endOfTerm: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
