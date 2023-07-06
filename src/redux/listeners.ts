import { createListenerMiddleware } from '@reduxjs/toolkit'
import { IState } from '../@types/StateInterfaces'

export const listenerMiddleware = createListenerMiddleware<IState>()

// Listing all the files that has listeners
// This is done so that the files are included in the build
import './listeners/initialListener'
import './listeners/appListeners'
import './listeners/serviceListeners'
import './listeners/timetableListeners'

export default listenerMiddleware.middleware
