import { isAnyOf } from '@reduxjs/toolkit'

import { ITTNotifyPropType } from '@appTypes/TimetableInterfaces'

import { AppListeners } from '@redux/listeners'
import { selectAppNotifications } from '@redux/selectors/appSelectors'
import { selectNotificationData } from '@redux/selectors/serviceSelectors'
import { selectTTCurrentValidBlocksWithSub } from '@redux/selectors/timetableSelectors'
import { appInitialized, appNotificationsToggled } from '@redux/slices/appSlice'
import { serviceDataUpdated, serviceRefreshed } from '@redux/slices/serviceSlice'

import { generateNotifyObjects, startNS, stopNS } from '@utils/notificationsUtils'

const serviceListener: AppListeners = {
    // Listener for notifications service
    notificationServiceListener(startListening) {
        startListening({
            matcher: isAnyOf(appInitialized, serviceDataUpdated, appNotificationsToggled),
            effect: (_, listenerApi) => {
                const state = listenerApi.getState()
                const shouldNotify = selectAppNotifications(state)
                if (shouldNotify) {
                    const blocks = selectNotificationData(state)
                    startNS(blocks)
                } else {
                    stopNS()
                }
                // A timer for updating notification data at 00:00 am
                const timer = setInterval(() => {
                    const now = new Date()
                    if (now.getHours() === 0 && now.getMinutes() === 0 && now.getSeconds() === 0) {
                        clearInterval(timer)
                        stopNS()
                        // Refreshing data
                        listenerApi.dispatch(serviceRefreshed())
                    }
                }, 1000)
            }
        })
    },

    // Refreshing notification data
    serviceDataRefreshListener(startListening) {
        startListening({
            actionCreator: serviceRefreshed,
            effect: (_, listenerApi) => {
                stopNS()
                const state = listenerApi.getState()
                const blocks = selectTTCurrentValidBlocksWithSub(state)
                const notifyConfigs: ITTNotifyPropType = {
                    notifyStart: state.timetable.settings.notifyStart,
                    notifyStartBefore: state.timetable.settings.notifyStartBefore,
                    notifyEnd: state.timetable.settings.notifyEnd,
                    notifyEndBefore: state.timetable.settings.notifyEndBefore
                }
                const notifyObjects = generateNotifyObjects(blocks, notifyConfigs)
                listenerApi.dispatch(serviceDataUpdated(notifyObjects))
            }
        })
    }
}

export default serviceListener
