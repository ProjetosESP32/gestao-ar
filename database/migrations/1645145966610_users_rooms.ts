import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersRooms extends BaseSchema {
  protected tableName = 'users_rooms'

  public async up() {
    this.schema.createTable(this.tableName, table => {
      table.increments('id')

      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('room_id').unsigned().references('id').inTable('rooms').onDelete('CASCADE')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
