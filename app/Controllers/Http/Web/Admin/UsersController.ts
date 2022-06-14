import { Attachment } from '@ioc:Adonis/Addons/AttachmentLite'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Invite from 'App/Mailers/Invite'
import Room from 'App/Models/Room'
import User from 'App/Models/User'
import { generatePassword } from 'App/Utils/generatePassword'
import CreateUserValidator from 'App/Validators/Web/Admin/CreateUserValidator'
import UpdateUserValidator from 'App/Validators/Web/Admin/UpdateUserValidator'

export default class UsersController {
  public async index({ inertia, bouncer }: HttpContextContract) {
    await bouncer.authorize('admin')
    const users = await User.all()

    return inertia.render('User/UserList', { users })
  }

  public async create({ inertia, bouncer }: HttpContextContract) {
    await bouncer.authorize('admin')
    const rooms = await Room.all()

    return inertia.render('User/UserRegister', { rooms })
  }

  public async store({ request, response, bouncer }: HttpContextContract) {
    await bouncer.authorize('admin')
    const { username, email, roomIds } = await request.validate(CreateUserValidator)
    const generatedPassword = generatePassword(12)

    const user = await User.create({
      username,
      email,
      password: generatedPassword,
    })
    await user.related('rooms').attach(roomIds)
    await new Invite(user).sendLater()

    return response.redirect().toRoute('admin.users.index')
  }

  public async show({ params, inertia, bouncer }: HttpContextContract) {
    await bouncer.authorize('admin')
    const user = await User.findOrFail(params.id)

    return inertia.render('User/UserShow', { user })
  }

  public async update({ params, request, response, bouncer }: HttpContextContract) {
    await bouncer.authorize('admin')
    const user = await User.findOrFail(params.id)
    const { cover, ...data } = await request.validate(UpdateUserValidator)

    if (cover) {
      user.cover = Attachment.fromFile(cover)
    }

    user.merge(data)
    await user.save()

    return response.redirect().toRoute('admin.users.index')
  }

  public async destroy({ params, response, bouncer }: HttpContextContract) {
    await bouncer.authorize('admin')
    const user = await User.findOrFail(params.id)

    await user.softDelete()

    return response.redirect().toRoute('admin.users.index')
  }
}
