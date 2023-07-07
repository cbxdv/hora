import { isAnyOf } from '@reduxjs/toolkit'

import { listenerMiddleware } from '@redux/listeners'
import { appInitialized, selectAppNotifications, toggleNotifications } from '@redux/slices/appSlice'
import { selectNotificationData, updateServiceData } from '@redux/slices/serviceSlice'

import { startNS, stopNS } from '@utils/notificationsUtils'

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
