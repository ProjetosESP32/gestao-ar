import type { ApplicationContract } from '@ioc:Adonis/Core/Application'

/*
|--------------------------------------------------------------------------
| Provider
|--------------------------------------------------------------------------
|
| Your application is not ready when this file is loaded by the framework.
| Hence, the top level imports relying on the IoC container will not work.
| You must import them inside the life-cycle methods defined inside
| the provider class.
|
| @example:
|
| public async ready () {
|   const Database = this.app.container.resolveBinding('Adonis/Lucid/Database')
|   const Event = this.app.container.resolveBinding('Adonis/Core/Event')
|   Event.on('db:query', Database.prettyPrint)
| }
|
*/
export default class BasicSchedulerProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    this.app.container.singleton('App/Scheduler', () => {
      const logger = this.app.container.use('Adonis/Core/Logger')

      const { BasicSchedulerService } = require('../app/Services/BasicSchedulerService')
      return new BasicSchedulerService(logger)
    })
  }

  public async boot() {
    // All bindings are ready, feel free to use them
  }

  public async ready() {
    const scheduler = this.app.container.use('App/Scheduler')
    scheduler.start()
  }

  public async shutdown() {
    console.log('Application shutdown')
    const scheduler = this.app.container.use('App/Scheduler')
    scheduler.stopAndClear()
  }
}
