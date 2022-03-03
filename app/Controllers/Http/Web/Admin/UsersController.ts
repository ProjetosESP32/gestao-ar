import { Attachment } from '@ioc:Adonis/Addons/AttachmentLite'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Invite from 'App/Mailers/Invite'
import User from 'App/Models/User'
import { generatePassword } from 'App/Utils/generatePassword'
import CreateUserValidator from 'App/Validators/Web/Admin/CreateUserValidator'
import UpdateUserValidator from 'App/Validators/Web/Admin/UpdateUserValidator'

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

  public async show({ params, inertia }: HttpContextContract) {
    const user = await User.findOrFail(params.id)

    return inertia.render('User/UserShow', { user })
  }

  public async edit({ params, inertia }: HttpContextContract) {
    const user = await User.findOrFail(params.id)

    return inertia.render('User/UserEdit', { user })
  }

  public async update({ params, request, response }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    const { cover, ...data } = await request.validate(UpdateUserValidator)

    if (cover) {
      user.cover = Attachment.fromFile(cover)
    }

    user.merge(data)
    await user.save()

    return response.redirect().toRoute('admin.users.index')
  }

  public async destroy({ params, response }: HttpContextContract) {
    const user = await User.findOrFail(params.id)

    await user.softDelete()

    return response.redirect().toRoute('admin.users.index')
  }
}
