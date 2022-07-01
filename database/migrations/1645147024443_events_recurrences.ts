import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class EventsRecurrences extends BaseSchema {
  protected tableName = 'events_recurrences'

  public async up() {
    this.schema.createTable(this.tableName, table => {
      table.increments('id')
      table.integer('event_id').unsigned().references('id').inTable('events').onDelete('CASCADE')

      table.string('days_of_week', 13).nullable() // the 13 number is base on the all possible days of week with a comma separator
      table.string('days_of_month', 83).nullable() // the 83 number is based on the all possible days of the month with a comma separator
      table.time('start_time')
      table.time('end_time')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
