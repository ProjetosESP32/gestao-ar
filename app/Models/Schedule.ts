import { BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { ScheduleRepeat } from 'App/Enums/ScheduleRepeat'
import { SoftDeletesBaseModel } from 'App/Utils/SoftDeletes'
import { DateTime } from 'luxon'
import Room from './Room'
import ScheduleException from './ScheduleException'

const arrayPreparer = <T>(array: T[]): string => JSON.stringify(array)

export default class Schedule extends SoftDeletesBaseModel {
  @column({ isPrimary: true })
  public id!: number

  @column()
  public roomId!: number

  @column()
  public name!: string

  @column.date()
  public scheduleDate!: DateTime

  @column()
  public startTime?: string | null

  @column()
  public endTime?: string | null

  @column()
  public isAllDay!: boolean

  @column()
  public repeat!: ScheduleRepeat

  @column()
  public repeatInterval!: number

  @column({ prepare: arrayPreparer })
  public daysOfWeek?: number[] | null

  @column()
  public weekNumber?: number | null

  @column({ prepare: arrayPreparer })
  public daysOfMonth?: number[] | null

  @column()
  public timezone!: string

  @column.dateTime()
  public activeUntil!: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt!: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt!: DateTime

  @hasMany(() => ScheduleException)
  public exceptions!: HasMany<typeof ScheduleException>

  @belongsTo(() => Room)
  public room!: BelongsTo<typeof Room>
}
