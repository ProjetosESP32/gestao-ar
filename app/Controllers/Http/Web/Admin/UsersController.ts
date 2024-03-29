import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Exception } from '@poppinss/utils'
import Invite from 'App/Mailers/Invite'
import Room from 'App/Models/Room'
import User from 'App/Models/User'
import { generatePassword } from 'App/Utils/generatePassword'
import CreateUserValidator from 'App/Validators/Web/Admin/CreateUserValidator'
import UpdateUserValidator from 'App/Validators/Web/Admin/UpdateUserValidator'

export default class UsersController {
  public async index({ inertia, bouncer, request }: HttpContextContract) {
    await bouncer.authorize('admin')
    const { page, perPage } = request.qs()
    const pageNumber = Number(page) || 1
    const perPageNumber = Number(perPage) || 10
    const users = await User.query().paginate(pageNumber, perPageNumber)

    return inertia.render('Admin/Users/Index', { users })
  }

  public async create({ inertia, bouncer, request }: HttpContextContract) {
    await bouncer.authorize('admin')
    const { page, perPage } = request.qs()
    const pageNumber = Number(page) || 1
    const perPageNumber = Number(perPage) || 10
    const rooms = await Room.query().paginate(pageNumber, perPageNumber)

    return inertia.render('Admin/Users/Create', { rooms })
  }

  public async store({ request, response, bouncer, session }: HttpContextContract) {
    await bouncer.authorize('admin')
    const { username, email, rooms, isRoot } = await request.validate(CreateUserValidator)
    const generatedPassword = generatePassword(12)

    const user = await User.create({
      username,
      email,
      isRoot,
      password: generatedPassword,
    })

    if (rooms?.length) {
      await user.related('rooms').attach(rooms)
    }

    await new Invite(user).sendLater()

    session.flash('alert', {
      severity: 'success',
      message: 'Usuário criado com sucesso',
    })

    return response.redirect().toRoute('admin.users.index')
  }

  public async show({ params, inertia, bouncer }: HttpContextContract) {
    await bouncer.authorize('admin')
    const user = await User.findOrFail(params.id)
    await user.load('rooms')

    return inertia.render('Admin/Users/Show', { user })
  }

  public async update({ params, request, response, bouncer, session }: HttpContextContract) {
    await bouncer.authorize('admin')
    const user = await User.findOrFail(params.id)
    const { roomIds, ...data } = await request.validate(UpdateUserValidator)

    user.merge(data)
    await user.save()

    if (roomIds?.length) {
      await user.related('rooms').attach(roomIds)
    }

    session.flash('alert', {
      severity: 'success',
      message: 'Usuário atualizado com sucesso',
    })

    return response.redirect().toRoute('admin.users.index')
  }

  public async detachRoom({ params, response, bouncer, session }: HttpContextContract) {
    await bouncer.authorize('admin')
    const user = await User.findOrFail(params.id)

    await user.related('rooms').detach([params.roomId])

    session.flash('alert', {
      severity: 'success',
      message: 'Sala removida com sucesso',
    })

    return response.redirect().toRoute('admin.users.show', { id: user.id })
  }

  public async destroy({ params, response, bouncer, session }: HttpContextContract) {
    await bouncer.authorize('admin')

    if (Number(params.id) === 1) {
      throw new Exception('Você não pode deletar o usuário administrador', 403, 'ROOT_USER_DELETE_ERROR')
    }

    const user = await User.findOrFail(params.id)

    await user.softDelete()

    session.flash('alert', {
      severity: 'success',
      message: 'Usuário removido com sucesso',
    })

    return response.redirect().toRoute('admin.users.index')
  }
}
