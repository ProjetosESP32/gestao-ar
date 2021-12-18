import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {

    async registro ({ request, inertia }: HttpContextContract ){

        const data = request.only (['username', 'email', 'password']);
        const user = await User.create(data);
        user.save();

        return inertia.render('Home/Index');
      }

      // Atenticacao/ login, requisita email e senha do usuario cadastrado
      async autenticacao ( {request, auth} ){

        const {email, password} = request.all();
        const token = await auth.attempt(email, password);
        return token;

      }


}
