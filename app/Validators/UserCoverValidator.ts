import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class UserCoverValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    file: schema.file({ extnames: ['png', 'jpg', 'jpeg'], size: 2 * 1024 * 1024 }),
  })

  public messages = {
    'file.required': 'O arquivo para atualizar a foto é obrigatório',
    'file.file': 'O arquivo para atualizar a foto deve ser um arquivo',
    'file.extname': 'O arquivo para atualizar a foto deve ser uma imagem',
    'file.size': 'O arquivo para atualizar a foto deve ter no máximo 2MB',
  }
}
