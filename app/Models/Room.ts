import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Esp from './Esp'
import User from './User'

export default class Room extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public block: string

  @column()
  public floor: string

  @column()
  public roomNumber: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Esp)
  public esps: HasMany<typeof Esp>

  @manyToMany(() => User)
  public users: ManyToMany<typeof User>
}
