import { createHmac } from 'node:crypto'
import Env from '@ioc:Adonis/Core/Env'

export const generateServiceToken = (): string => {
  const hash = createHmac('sha256', Env.get('APP_KEY'))
  hash.update(Date.now().toString())
  return hash.digest('base64')
}
