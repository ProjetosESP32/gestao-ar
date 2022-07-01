declare module '@ioc:Adonis/Core/Application' {
  import { SchedulerContract } from '@ioc:App/Scheduler'

  export interface ContainerBindings {
    'App/Scheduler': SchedulerContract
  }
}
