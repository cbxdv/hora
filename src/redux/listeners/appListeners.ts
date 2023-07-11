import { isAnyOf } from '@reduxjs/toolkit'

import { AppListeners } from '@redux/listeners'
import { selectAppSettings } from '@redux/selectors/appSelectors'
import { appNotificationsToggled, appThemeChanged, appThemeToggled } from '@redux/slices/appSlice'
import { StorageString } from './initialListener'
import { normalizeObject } from '@utils/objectUtils'
import { IAppSettings } from '@appTypes/AppInterfaces'

const appListeners: AppListeners = {
    // Listener for storing app settings
    appSettingsSaveDataListener(startListening) {
        startListening({
            matcher: isAnyOf(appThemeChanged, appNotificationsToggled, appThemeToggled),
            effect: (_, listenerApi) => {
                const settings = selectAppSettings(listenerApi.getState())
                const normalized = normalizeObject(settings) as IAppSettings
                localStorage.setItem(StorageString.App, JSON.stringify(normalized))
            }
        })
    }
}

export default appListeners
