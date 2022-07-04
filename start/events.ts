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
Event.on('air-change:dispatch', 'AirChange.onDispatch')
Event.on('air-change:receive', 'AirChange.onReceive')
Event.on('air-change:dispatchAll', 'AirChange.onDispatchAll')
