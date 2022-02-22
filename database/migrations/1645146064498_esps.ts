import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Esps extends BaseSchema {
  protected tableName = 'esps'

  public async up() {
    this.schema.createTable(this.tableName, table => {
      table.increments('id')
      table.integer('room_id').unsigned().references('id').inTable('rooms').onDelete('CASCADE')

      table.string('name', 25)
      table.string('mac_address', 12)

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
