import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Taxes extends BaseSchema {
  protected tableName = 'taxes'

  public async up() {
    this.schema.createTable(this.tableName, table => {
      table.increments('id')

      table.decimal('tax', 11, 2)
      table.timestamp('start_of_term', { useTz: true })
      table.timestamp('end_of_term', { useTz: true })

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
