import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class UpdateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    username: schema.string.optional({ trim: true }, [
      rules.unique({
        table: 'users',
        column: 'username',
        whereNot: { id: Number(this.ctx.params.id) },
        where: { deleted_at: null },
      }),
    ]),
    email: schema.string.optional({}, [
      rules.email(),
      rules.unique({
        table: 'users',
        column: 'email',
        whereNot: { id: Number(this.ctx.params.id) },
        where: { deleted_at: null },
      }),
    ]),
    isRoot: schema.boolean.optional(),
    roomIds: schema.array.optional().members(schema.number([rules.exists({ table: 'rooms', column: 'id' })])),
  })

  public messages = {
    'username.unique': 'Este nome de usuário já está em uso',
    'email.email': 'O campo email deve ser um email válido',
    'email.unique': 'Este email já está em uso',
    'isRoot.boolean': 'O campo isRoot deve ser um booleano',
    'roomIds.array': 'O campo roomIds deve ser um array',
    'roomIds.*.number': 'O id deve ser um número',
    'roomIds.*.exists': 'Não existe nenhuma sala com este id',
  }
}
