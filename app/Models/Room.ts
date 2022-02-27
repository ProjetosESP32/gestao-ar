import { column, HasMany, hasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Esp from './Esp'
import User from './User'
import { SoftDeletesBaseModel } from 'App/Utils/SoftDeletes'

export default class Room extends SoftDeletesBaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public block: string

  @column()
  public floor: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Esp)
  public esps: HasMany<typeof Esp>

  @manyToMany(() => User)
  public users: ManyToMany<typeof User>
}
