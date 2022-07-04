import { NormalizeConstructor, compose } from '@ioc:Adonis/Core/Helpers'
import {
  BaseModel,
  beforeFetch,
  beforeFind,
  beforePaginate,
  column,
  LucidModel,
  ModelAdapterOptions,
  ModelQueryBuilderContract,
} from '@ioc:Adonis/Lucid/Orm'
import { Exception } from '@poppinss/utils'
import { DateTime } from 'luxon'

const IS_IGNORED_PROPERTY = Symbol('SoftDeletes$isIgnoringDelete')

export const softDeletesMixin = <T extends NormalizeConstructor<LucidModel>>(Superclass: T) => {
  class ModelWithSoftDeletes extends Superclass {
    @column.dateTime({ serializeAs: null })
    public deletedAt?: DateTime | null

    public get trashed() {
      return !!this.deletedAt
    }

    public async softDelete() {
      if (this.$isDeleted) {
        throw new Exception('Cannot soft delete a deleted model', 500, 'E_MODEL_SOFT_DELETE_ERROR')
      }

      if (this.trashed) {
        return
      }

      this.deletedAt = DateTime.now()

      await this.save()
    }

    public async restore() {
      if (this.$isDeleted) {
        throw new Exception('Cannot restore a soft deleted model', 500, 'E_MODEL_RESTORE_ERROR')
      }

      if (!this.trashed) {
        return
      }

      this.deletedAt = null
      await this.save()
    }

    private static isIgnoring<M extends typeof ModelWithSoftDeletes>(query: ModelQueryBuilderContract<M>) {
      if (typeof query[IS_IGNORED_PROPERTY] === 'undefined' || query[IS_IGNORED_PROPERTY] === null) {
        query[IS_IGNORED_PROPERTY] = true
      }

      return query[IS_IGNORED_PROPERTY]
    }

    private static disableIgnore<M extends typeof ModelWithSoftDeletes>(query: ModelQueryBuilderContract<M>) {
      if (!this.isIgnoring(query)) {
        return query
      }

      query[IS_IGNORED_PROPERTY] = false
      return query
    }

    public static withTrashed<M extends typeof ModelWithSoftDeletes>(this: M, options?: ModelAdapterOptions) {
      return this.disableIgnore(this.query(options))
    }

    public static onlyTrashed<M extends typeof ModelWithSoftDeletes>(this: M, options?: ModelAdapterOptions) {
      const query = this.disableIgnore(this.query(options))

      return query.whereNotNull(`${query.model.table}.deleted_at`)
    }

    @beforeFind()
    @beforeFetch()
    protected static ignoreDeleted(
      query: ModelQueryBuilderContract<typeof ModelWithSoftDeletes, InstanceType<typeof ModelWithSoftDeletes>>,
    ) {
      if (!this.isIgnoring(query)) {
        return
      }

      query.whereNull(`${query.model.table}.deleted_at`)
    }

    @beforePaginate()
    protected static ignoreDeletedPaginate([countQuery, query]: [
      ModelQueryBuilderContract<typeof ModelWithSoftDeletes, InstanceType<typeof ModelWithSoftDeletes>>,
      ModelQueryBuilderContract<typeof ModelWithSoftDeletes, InstanceType<typeof ModelWithSoftDeletes>>,
    ]) {
      if (!this.isIgnoring(query)) {
        return
      }

      countQuery.whereNull(`${countQuery.model.table}.deleted_at`)
      query.whereNull(`${query.model.table}.deleted_at`)
    }
  }

  return ModelWithSoftDeletes
}

export const SoftDeletesBaseModel = compose(BaseModel, softDeletesMixin)
