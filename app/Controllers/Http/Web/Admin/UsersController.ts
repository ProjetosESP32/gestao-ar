import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Invite from 'App/Mailers/Invite'
import User from 'App/Models/User'
import { generatePassword } from 'App/Utils/generatePassword'
import CreateUserValidator from 'App/Validators/Web/Admin/CreateUserValidator'

export default class UsersController {
  public async index({ inertia }: HttpContextContract) {
    const users = await User.all()

    return inertia.render('User/UserList', { users })
  }

  public async create({ inertia }: HttpContextContract) {
    return inertia.render('User/UserRegister')
  }

  public async store({ request }: HttpContextContract) {
    const { username, email } = await request.validate(CreateUserValidator)
    const generatedPassword = generatePassword(12)

    const user = await User.create({
      username,
      email,
      password: generatedPassword,
    })
    await new Invite(user).sendLater()
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
