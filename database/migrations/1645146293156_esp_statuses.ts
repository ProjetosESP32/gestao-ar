import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class EspStatuses extends BaseSchema {
  protected tableName = 'esp_statuses'

  public async up() {
    this.schema.createTable(this.tableName, table => {
      table.increments('id')
      table.integer('esp_id').unsigned().references('id').inTable('esps').onDelete('CASCADE')

      table.decimal('temperature', 6, 3)
      table.decimal('humidity', 6, 3)
      table.decimal('potency', 6, 6)

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
