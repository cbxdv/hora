import { createListenerMiddleware } from '@reduxjs/toolkit'

import { IState } from '@appTypes/StateInterfaces'

export const listenerMiddleware = createListenerMiddleware<IState>()

// Listing all the files that has listeners
// This is done so that the files are included in the build
import './listeners/appListeners'
import './listeners/initialListener'
import './listeners/serviceListeners'
import './listeners/timetableListeners'

export default listenerMiddleware.middleware
