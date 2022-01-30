import { Attachment } from '@ioc:Adonis/Addons/AttachmentLite'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import VerifyEmail from 'App/Mailers/VerifyEmail'
import UpdateUserValidator from 'App/Validators/UpdateUserValidator'

export const updateUser = async ({ auth, request }: HttpContextContract) => {
  const { cover, email, username } = await request.validate(UpdateUserValidator)

  const user = auth.use('api').user!

  user.merge({ username })

  if (cover) {
    user.cover = Attachment.fromFile(cover)
  }

  if (email) {
    user.email = email
    user.emailVerifiedAt = null
    await new VerifyEmail(user).sendLater()
  }

  await user.save()

  return user
}
