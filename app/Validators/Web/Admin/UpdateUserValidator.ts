import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class UpdateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    username: schema.string.optional({ trim: true }, [
      rules.unique({ table: 'users', column: 'username', whereNot: { id: Number(this.ctx.params.id) } }),
    ]),
    email: schema.string.optional({}, [
      rules.email(),
      rules.unique({ table: 'users', column: 'email', whereNot: { id: Number(this.ctx.params.id) } }),
    ]),
    cover: schema.file.optional({ extnames: ['jpg', 'jpeg', 'png'], size: '2mb' }),
  })

  public messages = {
    'username.unique': 'Este nome de usuário já está em uso',
    'email.email': 'O campo email deve ser um email válido',
    'email.unique': 'Este email já está em uso',
    'cover.extname': 'O arquivo deve ser uma imagem',
    'cover.size': 'O arquivo deve ter no máximo 2mb',
  }
}
