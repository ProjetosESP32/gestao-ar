import { GuardsList } from '@ioc:Adonis/Addons/Auth'
import Hash from '@ioc:Adonis/Core/Hash'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UpdatePasswordValidator from 'App/Validators/UpdatePasswordValidator'

export const updatePassword = async ({ auth, request }: HttpContextContract, guard: keyof GuardsList) => {
  const { oldPassword, newPassword } = await request.validate(UpdatePasswordValidator)
  const user = auth.use(guard).user!

  const oldPasswordMatches = await Hash.verify(user.password, oldPassword)

  if (!oldPasswordMatches) {
    throw new Error('Senha atual incorreta')
  }

  user.password = newPassword
  await user.save()

  return user
}
