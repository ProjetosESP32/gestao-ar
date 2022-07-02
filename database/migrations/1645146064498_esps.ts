import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Esps extends BaseSchema {
  protected tableName = 'esps'

  public async up() {
    this.schema.createTable(this.tableName, table => {
      table.increments('id')
      table.integer('room_id').unsigned().references('id').inTable('rooms').onDelete('SET NULL').nullable()

      table.string('name', 25)
      table.string('mac_address', 12).unique()
      table.boolean('is_on').defaultTo(false)

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.timestamp('deleted_at', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
