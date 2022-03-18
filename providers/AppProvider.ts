import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { Exception } from '@poppinss/utils'
import { CamelCaseNamingStrategy } from './CamelCaseNamingStrategy'

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
  }

  public async boot() {
    const { Route } = this.app.container.use('Adonis/Core/Route')
    const { ModelQueryBuilder } = this.app.container.use('Adonis/Lucid/Database')
    const { DatabaseQueryBuilder } = this.app.container.use('Adonis/Lucid/Database')
    const { BaseModel } = this.app.container.use('Adonis/Lucid/Orm')

    Route.macro('mustBeSigned', function () {
      this.middleware(async ({ request }, next) => {
        if (!request.hasValidSignature()) {
          throw new Exception('Assinatura inválida', 400, 'ERR_INVALID_SIGNATURE')
        }

        return next()
      })

      return this
    })

    ModelQueryBuilder.macro('getCount', async function () {
      const result = await this.count('* as total')
      return BigInt(result[0].$extras.total)
    })

    DatabaseQueryBuilder.macro('getCount', async function () {
      const result = await this.count('* as total')
      return BigInt(result[0].total)
    })

    BaseModel.namingStrategy = new CamelCaseNamingStrategy()
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
