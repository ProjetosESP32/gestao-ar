import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'esp_statuses'

  public async up() {
    this.schema.alterTable(this.tableName, table => {
      table.renameColumn('potency', 'consumption')
      table.decimal('voltage', 6, 3)
      table.decimal('current', 6, 3)
      table.decimal('potencyFactor', 3, 3)
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, table => {
      table.renameColumn('consumption', 'potency')
      table.dropColumns('voltage', 'current', 'potencyFactor')
    })
  }
}
