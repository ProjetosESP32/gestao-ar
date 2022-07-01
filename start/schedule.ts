import Scheduler from '@ioc:App/Scheduler'
import ms from 'ms'

Scheduler.registerTask(
  'updateAirState',
  async () => {
    throw new Error('This task is not implemented yet')
  },
  ms('30m'),
)
