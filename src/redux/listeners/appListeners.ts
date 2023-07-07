import { isAnyOf } from '@reduxjs/toolkit'

import { listenerMiddleware } from '@redux/listeners'

import {
    changeTheme,
    selectAppSettings,
    selectOpenAtStartup,
    toggleMinimizeOnClose,
    toggleNotifications,
    toggleOpenAtStartup,
    toggleOpenMinimized,
    toggleTheme
} from '../slices/appSlice'

// Listener for storing app settings
listenerMiddleware.startListening({
    matcher: isAnyOf(
        changeTheme,
        toggleNotifications,
        toggleMinimizeOnClose,
        toggleOpenAtStartup,
        toggleOpenMinimized,
        toggleTheme
    ),
    effect: (_, listenerApi) => {
        const settings = selectAppSettings(listenerApi.getState())
        api.saveAppSettingsToDisk(settings)
    }
})

// Listener for auto login
listenerMiddleware.startListening({
    actionCreator: toggleOpenAtStartup,
    effect: (_, listenerApi) => {
        const openAtStartup = selectOpenAtStartup(listenerApi.getState())
        if (openAtStartup) {
            api.enableAutoLogin()
        } else {
            api.disableAutoLogin()
        }
    }
})
