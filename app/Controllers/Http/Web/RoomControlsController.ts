import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Esp from 'App/Models/Esp'
import Room from 'App/Models/Room'

type ConvertedConsumptionData = Record<string, string | number>

export default class RoomControlsController {
  public async show({ params, inertia, auth }: HttpContextContract) {
    const { user } = auth.use('web')

    const results = await Database.transaction(async client => {
      const room = await Room.query({ client })
        .where('id', params.id)
        .preload('esps', query => {
          query.preload('consumptions', builder => {
            builder.whereNotExists(
              Database.from('consumptions as c')
                .select('*')
                .where('c.esp_id', '=', Database.raw('`consumptions`.`esp_id`'))
                .where('c.created_at', '>', Database.raw('`consumptions`.`created_at`')),
            )
          })
        })
        .firstOrFail()
      const esps = await Esp.query({ client }).whereNot('roomId', room.id).orWhereNull('roomId')
      const consumptionNow = await Database.from('consumptions')
        .innerJoin('esps', 'consumptions.esp_id', 'esps.id')
        .innerJoin('rooms', 'esps.room_id', 'rooms.id')
        .max('consumptions.created_at', 'maxDate')
        .sum('consumptions.potency', 'totalPotency')
        .whereIn(
          'esp_id',
          esps.map(esp => esp.id),
        )
        .useTransaction(client)
      const dailyConsumption = await Database.from('consumptions')
        .select(Database.raw('MIN(`created_at`) AS `createdAt`'), Database.raw('HOUR(`created_at`) as `hour`'))
        .where('created_at', '>', Database.raw('NOW() - INTERVAL 1 DAY'))
        .sum('potency as totalPotency')
        .groupBy('hour')
        .orderBy('hour', 'asc')
        .whereIn(
          'esp_id',
          room.esps.map(esp => esp.id),
        )
        .useTransaction(client)
      const monthConsumption = await Database.from('consumptions')
        .select(Database.raw('MONTH(`created_at`) as `month`'))
        .sum('potency as totalPotency')
        .groupBy('month')
        .orderBy('month', 'asc')
        .whereIn(
          'esp_id',
          room.esps.map(esp => esp.id),
        )
        .useTransaction(client)

      const data = {
        room,
        esps,
        consumptionNow: this.convertPotencyToNumber(consumptionNow),
        dailyConsumption: this.convertPotencyToNumber(dailyConsumption),
        monthConsumption: this.convertPotencyToNumber(monthConsumption),
      }

      if (user?.isRoot) {
        return { ...data, canEdit: true }
      }

      const isUserRelatedToRoom = await user
        ?.related('rooms')
        .query()
        .where('id', params.id)
        .useTransaction(client)
        .getCount()
      const canEdit = !!isUserRelatedToRoom

      return { ...data, canEdit }
    })

    return inertia.render('Control/RoomControl', results)
  }

  private convertPotencyToNumber(consumptionData: Record<string, string>[]): ConvertedConsumptionData[] {
    return consumptionData.map(({ totalPotency, ...data }) => ({ ...data, totalPotency: Number(totalPotency) }))
  }
}
