import Database from '@ioc:Adonis/Lucid/Database'

export default class HomeController {
  public async index() {
    return Database.transaction(async client => {
      const consumptionNow = await Database.from('esp_statuses')
        .select('rooms.block as block', 'esp_statuses.potency as potency')
        .innerJoin('esps', 'esp_statuses.esp_id', 'esps.id')
        .innerJoin('rooms', 'esps.room_id', 'rooms.id')
        .max('esp_statuses.created_at')
        .groupBy('block')
        .useTransaction(client)
      const dailyConsumption = await Database.from('esp_statuses')
        .select(Database.raw('HOUR(`created_at`) as `hour`'))
        .where('created_at', '>', Database.raw('NOW() - INTERVAL 1 DAY'))
        .sum('potency', 'totalPotency')
        .groupBy('hour')
        .orderBy('hour', 'asc')
        .useTransaction(client)
      const monthConsumption = await Database.from('esp_statuses')
        .select(Database.raw('MONTH(`created_at`) as `month`'))
        .sum('potency', 'totalPotency')
        .groupBy('month')
        .orderBy('month', 'asc')
        .useTransaction(client)

      return {
        consumptionNow: consumptionNow.map(({ block, potency }) => ({
          block,
          potency: Number(potency),
        })),
        dailyConsumption: dailyConsumption.map(({ hour, totalPotency }) => ({
          hour: Number(hour),
          totalPotency: Number(totalPotency),
        })),
        monthConsumption: monthConsumption.map(({ month, totalPotency }) => ({
          month: Number(month),
          totalPotency: Number(totalPotency),
        })),
      }
    })
  }
}
