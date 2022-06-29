import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class UpdateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    username: schema.string.optional({ trim: true }, [
      rules.unique({ table: 'users', column: 'username', whereNot: { id: this.ctx.auth.user!.id } }),
    ]),
    email: schema.string.optional({ trim: true }, [
      rules.email(),
      rules.unique({ table: 'users', column: 'email', whereNot: { id: this.ctx.auth.user!.id } }),
    ]),
    cover: schema.file.optional({ extnames: ['jpg', 'jpeg', 'png'], size: '2mb' }),
  })

  public messages = {
    'username.unique': 'Nome de usuário já usado.',
    'email.unique': 'Email já usado.',
    'email.email': 'Email inválido.',
    'file.extname': 'Extensão de arquivo inválida.',
    'file.size': 'O tamanho do arquivo deve ser menor que {{ options.size }}.',
  }
}
