import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { updatePassword } from 'App/Services/Users/updatePassword'
import { updateUser } from 'App/Services/Users/updateUser'

export default class UsersController {
  public async show({ auth }: HttpContextContract) {
    const user = auth.use('api').user!
    await user.load('rooms')

    return user
  }

  public async update(context: HttpContextContract) {
    return updateUser(context, 'api')
  }

  public async updatePassword(context: HttpContextContract) {
    return updatePassword(context, 'api')
  }

  public async destroy({ auth }: HttpContextContract) {
    const user = auth.use('api').user!

    await user.delete()
  }
}
