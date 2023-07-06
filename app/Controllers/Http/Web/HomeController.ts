import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

export default class HomeController {
  public async index({ inertia }: HttpContextContract) {
    const results = await Database.transaction(async client => {
      const averageConsumption = await Database.from('esp_statuses')
        .select('rooms.block as block', Database.raw('AVG(`esp_statuses`.`consumption`) as `totalPotency`'))
        .innerJoin('esps', 'esp_statuses.esp_id', 'esps.id')
        .innerJoin('rooms', 'esps.room_id', 'rooms.id')
        .max('esp_statuses.created_at')
        .groupBy('block')
        .useTransaction(client)
      const dailyConsumption = await Database.from('esp_statuses')
        .select(Database.raw('HOUR(`created_at`) as `hour`'))
        .where('created_at', '>', Database.raw('NOW() - INTERVAL 1 DAY'))
        .sum('consumption', 'totalPotency')
        .groupBy('hour')
        .orderBy('hour', 'asc')
        .useTransaction(client)
      const monthConsumption = await Database.from('esp_statuses')
        .select(Database.raw('MONTH(`created_at`) as `month`'))
        .sum('consumption', 'totalPotency')
        .groupBy('month')
        .orderBy('month', 'asc')
        .useTransaction(client)

      return {
        averageConsumption: averageConsumption.map(({ block, totalPotency }) => ({
          block,
          potency: Number(totalPotency),
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

    return inertia.render('Home/Index', results)
  }
}
