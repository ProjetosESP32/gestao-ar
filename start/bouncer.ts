import Bouncer from '@ioc:Adonis/Addons/Bouncer'
import Room from 'App/Models/Room'
import User from 'App/Models/User'

export const { actions } = Bouncer.before((user: User | null) => {
  if (user?.isRoot) return true
})
  .define('admin', (user: User) => {
    if (user.isRoot) return true

    return Bouncer.deny('Not found', 404)
  })
  .define('updateRoom', async (user: User, room: Room) => {
    await user.load('rooms')

    return user.rooms.some(({ id }) => id === room.id)
  })

export const { policies } = Bouncer.registerPolicies({})
