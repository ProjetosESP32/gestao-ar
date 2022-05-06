/**
 * Config source: https://git.io/JOdi5
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import { AllyConfig } from '@ioc:Adonis/Addons/Ally'
import Env from '@ioc:Adonis/Core/Env'

/*
|--------------------------------------------------------------------------
| Ally Config
|--------------------------------------------------------------------------
|
| The `AllyConfig` relies on the `SocialProviders` interface which is
| defined inside `contracts/ally.ts` file.
|
*/
const allyConfig: AllyConfig = {
  /*
	|--------------------------------------------------------------------------
	| Google driver
	|--------------------------------------------------------------------------
	*/
  google: {
    driver: 'google',
    clientId: Env.get('GOOGLE_CLIENT_ID'),
    clientSecret: Env.get('GOOGLE_CLIENT_SECRET'),
    callbackUrl: `${Env.get('FRONTEND_URL')}/auth/google/callback`,
    scopes: ['userinfo.profile', 'userinfo.email'],
    prompt: 'consent',
  },
}

export default allyConfig
