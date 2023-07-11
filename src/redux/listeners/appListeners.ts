import { isAnyOf } from '@reduxjs/toolkit'

import { AppListeners } from '@redux/listeners'
import { selectAppSettings, selectOpenAtStartup } from '@redux/selectors/appSelectors'
import {
    appNotificationsToggled,
    appThemeChanged,
    appThemeToggled,
    minimizeOnCloseToggled,
    openAtStartupToggled,
    openMinimizedToggled
} from '@redux/slices/appSlice'
import { normalizeAppData } from '@utils/storeUtils'

const appListeners: AppListeners = {
    // Listener for storing app settings
    appSettingsSaveDataListener(startListening) {
        startListening({
            matcher: isAnyOf(
                appThemeChanged,
                appNotificationsToggled,
                minimizeOnCloseToggled,
                openAtStartupToggled,
                openMinimizedToggled,
                appThemeToggled
            ),
            effect: (_, listenerApi) => {
                let settings = selectAppSettings(listenerApi.getState())
                settings = normalizeAppData(settings)
                api.saveAppSettingsToDisk(settings)
            }
        })
    },

    // Listener for auto login
    autoLoginListener(startListening) {
        startListening({
            actionCreator: openAtStartupToggled,
            effect: (_, listenerApi) => {
                const openAtStartup = selectOpenAtStartup(listenerApi.getState())
                if (openAtStartup) {
                    api.enableAutoLogin()
                } else {
                    api.disableAutoLogin()
                }
            }
        })
    }
}

export default appListeners
