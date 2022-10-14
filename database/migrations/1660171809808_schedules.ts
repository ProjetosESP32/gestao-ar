import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'schedules'

  public async up() {
    this.schema.createTable(this.tableName, table => {
      table.increments('id')

      table.integer('room_id').unsigned().references('id').inTable('rooms').onDelete('CASCADE')

      table.string('name', 55)
      table.date('schedule_date')
      table.time('start_time').nullable()
      table.time('end_time').nullable()
      table.boolean('is_all_day').defaultTo(false)
      table.enum('repeat', ['once', 'daily', 'weekly', 'monthly', 'yearly'])
      table.integer('repeat_interval').defaultTo(1)
      table.json('days_of_week').nullable()
      table.integer('week_number').nullable()
      table.json('days_of_month').nullable()
      table.string('timezone')
      table.timestamp('active_until', { useTz: true })

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.timestamp('deleted_at', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
