import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, table => {
      table.increments('id').primary()
      table.string('username')
      table.string('email', 255)
      table.string('password', 180)
      table.string('remember_me_token').nullable()
      table.json('cover').nullable()
      table.boolean('is_root').defaultTo(false)
      table.timestamp('email_verified_at', { useTz: true }).nullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.timestamp('deleted_at', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
