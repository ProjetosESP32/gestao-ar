import Application from '@ioc:Adonis/Core/Application'
import Event from '@ioc:Adonis/Core/Event'
import Logger from '@ioc:Adonis/Core/Logger'
import Database from '@ioc:Adonis/Lucid/Database'

Event.on('db:query', query => {
  if (Application.inProduction) {
    Logger.debug(query, 'Database Query')
  } else {
    Database.prettyPrint(query)
  }
})
