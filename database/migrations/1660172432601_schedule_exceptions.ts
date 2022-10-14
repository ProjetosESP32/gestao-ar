import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'schedule_exceptions'

  public async up() {
    this.schema.createTable(this.tableName, table => {
      table.increments('id')

      table.integer('schedule_id').unsigned().references('id').inTable('schedules').onDelete('CASCADE')
      table.date('exception_date')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
