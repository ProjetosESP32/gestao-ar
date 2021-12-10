import { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
  }

  public async boot() {
    const { Route } = this.app.container.use('Adonis/Core/Route')
    const { ModelQueryBuilder } = this.app.container.use('Adonis/Lucid/Database')
    const { DatabaseQueryBuilder } = this.app.container.use('Adonis/Lucid/Database')

    Route.macro('mustBeSigned', function () {
      this.middleware(async ({ request, response }, next) => {
        if (!request.hasValidSignature()) {
          response.badRequest({ message: 'Invalid signature' })
          return
        }

        next()
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
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
