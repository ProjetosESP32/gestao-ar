import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import { generatePassword } from 'App/Utils/generatePassword'
import { DateTime } from 'luxon'
import Logger from '@ioc:Adonis/Core/Logger'

export default class AdminSeeder extends BaseSeeder {
  public async run() {
    Logger.info('Seeding admin user')

    const password = generatePassword(12)

    await User.firstOrCreate(
      { email: 'admin@admin.com' },
      {
        username: 'admin',
        email: 'admin@admin.com',
        emailVerifiedAt: DateTime.now(),
        isRoot: true,
        password,
      },
    )

    Logger.info(`Admin user seeded with password: ${password}`)
  }
}
