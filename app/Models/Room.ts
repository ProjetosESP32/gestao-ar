import { BaseModel, column, HasMany, hasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Esp from './Esp'
import Schedule from './Schedule'
import User from './User'

export default class Room extends BaseModel {
  @column({ isPrimary: true })
  public id!: number

  @column()
  public name!: string

  @column()
  public block!: string

  @column()
  public floor!: string

  @column.dateTime({ autoCreate: true })
  public createdAt!: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt!: DateTime

  @hasMany(() => Esp)
  public esps!: HasMany<typeof Esp>

  @manyToMany(() => User)
  public users!: ManyToMany<typeof User>

  @hasMany(() => Schedule)
  public schedules!: HasMany<typeof Schedule>
}
