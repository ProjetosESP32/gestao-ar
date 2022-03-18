import Database from '@ioc:Adonis/Lucid/Database'
import {
  beforeFetch,
  beforeFind,
  beforeSave,
  BelongsTo,
  belongsTo,
  column,
  computed,
  HasMany,
  hasMany,
  ModelQueryBuilderContract,
} from '@ioc:Adonis/Lucid/Orm'
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

  @hasMany(() => Consumption, { serializeAs: null })
  public lastConsumptions: HasMany<typeof Consumption>

  @computed()
  public get lastConsumption() {
    return this.lastConsumptions?.[0]
  }

  @beforeSave()
  public static clearMacAddress(esp: Esp) {
    if (esp.$dirty.macAddress) {
      esp.macAddress = esp.macAddress.replace(/[^0-9A-Fa-f]/g, '')
    }
  }

  @beforeFind()
  @beforeFetch()
  public static loadLastConsumption(query: ModelQueryBuilderContract<typeof Esp>) {
    query.preload('lastConsumptions', builder => {
      builder.whereNotExists(
        Database.from('consumptions as c')
          .select('*')
          .where('c.esp_id', '=', Database.raw('`consumptions`.`esp_id`'))
          .where('c.created_at', '>', Database.raw('`consumptions`.`created_at`')),
      )
    })
  }
}
