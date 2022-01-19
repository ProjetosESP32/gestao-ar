import { Attachment } from '@ioc:Adonis/Addons/AttachmentLite'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UpdateUserValidator from 'App/Validators/UpdateUserValidator'
import UserCoverValidator from 'App/Validators/UserCoverValidator'
import { DateTime } from 'luxon'

export default class UsersController {
  public async show({ inertia }: HttpContextContract) {
    return inertia.render('Users/Profile')
  }

  public async update({ auth, request, response }: HttpContextContract) {
    const dataToUpdate = await request.validate(UpdateUserValidator)
    const user = auth.use('web').user!

    user.merge(dataToUpdate)

    await user.save()

    return response.redirect().toRoute('profile')
  }

  public async storeCover({ auth, request, response }: HttpContextContract) {
    const { file } = await request.validate(UserCoverValidator)

    const user = auth.use('web').user!

    user.cover = Attachment.fromFile(file)

    await user.save()

    return response.redirect().toRoute('profile')
  }

  public async verifyEmail({ params, inertia }: HttpContextContract) {
    const { email } = params
    const user = await User.findByOrFail('email', email)

    user.emailVerifiedAt = DateTime.now()

    await user.save()

    return inertia.render('Users/VerifyEmail')
  }
}
