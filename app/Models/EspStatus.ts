import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Esp from './Esp'

const consumptionConsumer = (value: unknown) => Number(value)

export default class EspStatus extends BaseModel {
  @column({ isPrimary: true })
  public id!: number

  @column()
  public espId!: number

  @column({ consume: consumptionConsumer })
  public temperature!: number

  @column({ consume: consumptionConsumer })
  public humidity!: number

  @column({ consume: consumptionConsumer })
  public potency!: number

  @column.dateTime({ autoCreate: true })
  public createdAt!: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt!: DateTime

  @belongsTo(() => Esp)
  public esp!: BelongsTo<typeof Esp>
}
