import Event from '@ioc:Adonis/Core/Event'

Event.on('air-change:dispatch', 'AirChange.onDispatch')
Event.on('air-change:receive', 'AirChange.onReceive')
Event.on('air-change:dispatchAll', 'AirChange.onDispatchAll')
