import type { LoggerContract } from '@ioc:Adonis/Core/Logger'
import type { SchedulerContract } from '@ioc:App/Scheduler'

export class BasicSchedulerService implements SchedulerContract {
  private registeredIntervals = new Map<string, () => NodeJS.Timer>()
  private intervalIds: NodeJS.Timer[] = []
  private hasBeenStarted = false

  constructor(private logger: LoggerContract) {}

  public registerTask(name: string, callback: () => Promise<void>, interval: number): void {
    if (name.length === 0) {
      throw new Error('Task name cannot be an empty string')
    }

    if (this.registeredIntervals.has(name)) {
      throw new Error(`Scheduler already has a task with name ${name}`)
    }

    this.registeredIntervals.set(name, () => setInterval(this.makeRunnable(name, callback), interval))
  }

  private makeRunnable(name: string, callback: () => Promise<void>): () => void {
    return () => {
      callback().catch(error => {
        this.logger.error(error, `Error while running task ${name}`)
      })
    }
  }

  public start(): void {
    if (this.hasBeenStarted) {
      return
    }

    this.registeredIntervals.forEach(interval => {
      this.intervalIds.push(interval())
    })
    this.hasBeenStarted = true
  }

  public stop(): void {
    if (!this.hasBeenStarted) {
      return
    }

    this.intervalIds.forEach(clearInterval)
    this.intervalIds = []
  }

  public stopAndClear(): void {
    this.stop()
    this.registeredIntervals.clear()
  }
}
