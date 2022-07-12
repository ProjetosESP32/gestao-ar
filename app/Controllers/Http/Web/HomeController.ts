import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

export default class HomeController {
  public async index({ inertia }: HttpContextContract) {
    const results = await Database.transaction(async client => {
      const consumptionNow = await Database.from('consumptions')
        .select('rooms.block as block')
        .innerJoin('esps', 'consumptions.esp_id', 'esps.id')
        .innerJoin('rooms', 'esps.room_id', 'rooms.id')
        .groupBy('block')
        .max('consumptions.created_at', 'maxDate')
        .sum('consumptions.potency', 'totalPotency')
        .useTransaction(client)
      const dailyConsumption = await Database.from('consumptions')
        .select(Database.raw('MIN(`created_at`) AS `createdAt`'), Database.raw('HOUR(`created_at`) as `hour`'))
        .where('created_at', '>', Database.raw('NOW() - INTERVAL 1 DAY'))
        .sum('potency as totalPotency')
        .groupBy('hour')
        .orderBy('hour', 'asc')
        .useTransaction(client)
      const monthConsumption = await Database.from('consumptions')
        .select(Database.raw('MONTH(`created_at`) as `month`'))
        .sum('potency as totalPotency')
        .groupBy('month')
        .orderBy('month', 'asc')
        .useTransaction(client)

      return {
        consumptionNow: consumptionNow.map(({ block, totalPotency }) => ({
          block,
          totalPotency: Number(totalPotency),
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
