import { createListenerMiddleware } from '@reduxjs/toolkit'

import { IState } from '@appTypes/StateInterfaces'

export const listenerMiddleware = createListenerMiddleware<IState>()

import appListeners from './listeners/appListeners'
import initialListeners from './listeners/initialListener'
import serviceListener from './listeners/serviceListeners'
import timetableListeners from './listeners/timetableListeners'
import toastListeners from './listeners/toastListeners'

const allListeners: { [key: string]: AppListeners } = {
    initial: initialListeners,
    app: appListeners,
    timetable: timetableListeners,
    service: serviceListener,
    toast: toastListeners
}

// Iterating through listeners and start listening
Object.keys(allListeners).forEach(listenerGroupId => {
    const listenerGroup = allListeners[listenerGroupId]
    Object.keys(listenerGroup).forEach(listenerId => {
        const listenerFunction = listenerGroup[listenerId]
        listenerFunction(listenerMiddleware.startListening)
    })
})

type AppStartListening = typeof listenerMiddleware.startListening
type ListenerFn = (startListening: AppStartListening) => void
export type AppListeners = { [key: string]: ListenerFn }

export default listenerMiddleware.middleware
