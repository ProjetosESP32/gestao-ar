import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    username: schema.string({ trim: true }, [
      rules.unique({ table: 'users', column: 'username', where: { deleted_at: null } }),
    ]),
    email: schema.string({}, [
      rules.email(),
      rules.unique({ table: 'users', column: 'email', where: { deleted_at: null } }),
    ]),
    password: schema.string({}, [rules.minLength(6), rules.maxLength(16), rules.confirmed('passwordConfirmation')]),
    rememberMe: schema.boolean(),
  })

  public messages = {
    'username.required': 'O campo nome de usuário é obrigatório',
    'username.unique': 'Este nome de usuário já está em uso',
    'email.required': 'O campo email é obrigatório',
    'email.email': 'O campo email deve ser um email válido',
    'email.unique': 'Este email já está em uso',
    'password.required': 'O campo senha é obrigatório',
    'password.minLength': 'A senha deve ter no mínimo 6 caracteres',
    'password.maxLength': 'A senha deve ter no máximo 16 caracteres',
    'password.confirm': 'As senhas não conferem',
    'rememberMe.required': 'O campo lembrar-me é obrigatório',
    'rememberMe.boolean': 'O campo lembrar-me deve ser um booleano',
  }
}
