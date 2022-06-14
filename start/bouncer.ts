/**
 * Contract source: https://git.io/Jte3T
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import Bouncer from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'

export const { actions } = Bouncer.before((user: User | null) => {
  if (user?.isRoot) return true
}).define('admin', (user: User) => {
  if (user.isRoot) return true

  return Bouncer.deny('Not found', 404)
})

export const { policies } = Bouncer.registerPolicies({})
