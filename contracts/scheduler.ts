declare module '@ioc:App/Scheduler' {
  export interface SchedulerContract {
    registerTask(name: string, callback: () => Promise<void>, interval: number): void
    start(): void
    stop(): void
    stopAndClear(): void
  }

  const SchedulerInstance: SchedulerContract
  export default SchedulerInstance
}
