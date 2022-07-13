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
    rooms: schema.array.optional().members(schema.number([rules.exists({ table: 'rooms', column: 'id' })])),
    isRoot: schema.boolean.optional(),
  })

  public messages = {
    'username.required': 'O campo nome de usuário é obrigatório',
    'username.unique': 'Este nome de usuário já está em uso',
    'email.required': 'O campo email é obrigatório',
    'email.email': 'O campo email deve ser um email válido',
    'email.unique': 'Este email já está em uso',
    'rooms.required': 'O campo sala é obrigatório',
    'rooms.*.number': 'O campo sala deve ser uma lista de números',
    'isRoot.boolean': 'O campo root deve ser um booleano',
  }
}
