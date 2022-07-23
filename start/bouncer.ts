import Bouncer from '@ioc:Adonis/Addons/Bouncer'
import Room from 'App/Models/Room'
import User from 'App/Models/User'

export const { actions } = Bouncer.before((user: User | null) => {
  if (user?.isRoot) return true
})
  .define('admin', (user: User) => {
    if (user.isRoot) return true

    return Bouncer.deny('Unauthorized', 403)
  })
  .define('updateRoom', async (user: User, room: Room) => {
    const foundRoom = await user.related('rooms').query().where('id', room.id).first()

    return !!foundRoom
  })

export const { policies } = Bouncer.registerPolicies({})
