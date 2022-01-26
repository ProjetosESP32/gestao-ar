import { AuthContract } from '@ioc:Adonis/Addons/Auth'
import { ResponseContract } from '@ioc:Adonis/Core/Response'

export const redirectBackIfLogged = (auth: AuthContract, response: ResponseContract) => {
  if (auth.use('web').isLoggedIn) {
    response.redirect().back()
    return true
  }

  return false
}
