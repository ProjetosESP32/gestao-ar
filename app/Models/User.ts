import { attachment, AttachmentContract } from '@ioc:Adonis/Addons/AttachmentLite'
import Hash from '@ioc:Adonis/Core/Hash'
import { beforeSave, column, computed, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Room from './Room'
import { SoftDeletesBaseModel } from 'App/Utils/SoftDeletes'

export default class User extends SoftDeletesBaseModel {
  @column({ isPrimary: true })
  public id!: number

  @column()
  public username!: string

  @column()
  public email!: string

  @column({ serializeAs: null })
  public password!: string

  @column()
  public rememberMeToken?: string

  @column()
  public isRoot!: boolean

  @attachment({ preComputeUrl: true })
  public cover?: AttachmentContract | null

  @column({ serializeAs: null })
  public googleId?: string | null

  @computed()
  public get isGoogleLinked() {
    return !!this.googleId
  }

  @column.dateTime()
  public emailVerifiedAt?: DateTime | null

  @column.dateTime({ autoCreate: true })
  public createdAt!: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt!: DateTime

  @manyToMany(() => Room, { pivotTable: 'users_rooms' })
  public rooms!: ManyToMany<typeof Room>

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
