import { isAnyOf } from '@reduxjs/toolkit'

import { ITTNotifyPropType } from '@appTypes/TimetableInterfaces'

import { AppListeners } from '@redux/listeners'
import { selectAppNotifications } from '@redux/selectors/appSelectors'
import { selectNotificationData } from '@redux/selectors/serviceSelectors'
import { selectTTCurrentValidBlocksWithSub } from '@redux/selectors/timetableSelectors'
import { appInitialized, appNotificationsToggled } from '@redux/slices/appSlice'
import { serviceDataUpdated, serviceRefreshed } from '@redux/slices/serviceSlice'

import { startNotificationService, stopNotificationService } from '@services/notificationService'
import { startServiceDataService, stopServiceDataService } from '@services/serviceDataUpdater'

import { generateNotifyObjects } from '@utils/notificationsUtils'

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
                    startNotificationService(blocks)
                } else {
                    stopNotificationService()
                }

                // A service runner for updating data on day intervals
                startServiceDataService(() => listenerApi.dispatch(serviceRefreshed()))
            }
        })
    },

    // Refreshing notification data
    serviceDataRefreshListener(startListening) {
        startListening({
            actionCreator: serviceRefreshed,
            effect: (_, listenerApi) => {
                stopServiceDataService()
                stopNotificationService()
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
