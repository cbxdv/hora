import { isAnyOf } from '@reduxjs/toolkit'
import { listenerMiddleware } from '../listeners'
import { appInitialized, selectAppNotifications, toggleNotifications } from '../slices/appSlice'
import { selectNotificationData, updateServiceData } from '../slices/serviceSlice'
import { startNS, stopNS } from '../../utilities/notificationsUtils'

// Listener for notifications service
listenerMiddleware.startListening({
    matcher: isAnyOf(appInitialized, updateServiceData, toggleNotifications),
    effect: (_, listenerApi) => {
        const state = listenerApi.getState()
        const shouldNotify = selectAppNotifications(state)
        if (shouldNotify) {
            const blocks = selectNotificationData(state)
            startNS(blocks)
        } else {
            stopNS()
        }
    }
})
