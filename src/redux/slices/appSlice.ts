import { createSlice } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'

import { AppThemes, Themes } from '@appTypes/AppInterfaces'
import { AppInitPayload, AppThemePayload, ToastAddedPayload, ToastContentPayload } from '@appTypes/AppPayloadTypes'

import { AppIS } from '@redux/initialStates'

const appSlice = createSlice({
    name: `app`,
    initialState: AppIS,
    reducers: {
        appStarted(state) {
            state.statuses.isLoading = true
        },

        appInitialized(state, action: AppInitPayload) {
            state.settings = action.payload.settings
            state.statuses.showingTheme = action.payload.showingTheme
            state.statuses.osTheme = action.payload.osTheme
            state.statuses.isLoading = false
        },

        appSettingsOpened(state) {
            state.statuses.isAppSidebarVisible = false
            state.statuses.isSettingsVisible = true
        },

        appSettingsClosed(state) {
            state.statuses.isSettingsVisible = false
        },

        appSidebarOpened(state) {
            state.statuses.isAppSidebarVisible = true
        },

        appSidebarClosed(state) {
            state.statuses.isAppSidebarVisible = false
        },

        appThemeChanged(state, action: AppThemePayload) {
            state.settings.theme = action.payload
            if (action.payload === AppThemes.System) {
                state.statuses.showingTheme = state.statuses.osTheme
            } else {
                if (action.payload === AppThemes.Dark) {
                    state.statuses.showingTheme = Themes.Dark
                } else {
                    state.statuses.showingTheme = Themes.Light
                }
            }
        },

        appThemeToggled(state) {
            if (state.settings.theme === AppThemes.Light) {
                state.settings.theme = AppThemes.Dark
                state.statuses.showingTheme = Themes.Dark
            } else if (state.settings.theme === `dark`) {
                state.settings.theme = AppThemes.Light
                state.statuses.showingTheme = Themes.Light
            }
        },

        minimizeOnCloseToggled(state) {
            state.settings.minimizeOnClose = !state.settings.minimizeOnClose
        },

        openAtStartupToggled(state) {
            state.settings.openAtStartup = !state.settings.openAtStartup
        },

        appNotificationsToggled(state) {
            state.settings.notifications = !state.settings.notifications
        },

        openMinimizedToggled(state) {
            state.settings.openMinimized = !state.settings.openMinimized
        },

        toastAdded(state, action: ToastAddedPayload) {
            if (state.toasts.length >= 5) {
                state.toasts = state.toasts.splice(1, 5)
            }
            const { message, type } = action.payload
            state.toasts.push({ id: nanoid(), message, type })
        },

        toastRemoved(state, action: ToastContentPayload) {
            const { id } = action.payload
            state.toasts = state.toasts.filter(toast => toast.id !== id)
        }
    }
})

export const {
    appStarted,
    appInitialized,
    appSettingsOpened,
    appSettingsClosed,
    appSidebarOpened,
    appSidebarClosed,
    appThemeChanged,
    appThemeToggled,
    minimizeOnCloseToggled,
    openAtStartupToggled,
    appNotificationsToggled,
    openMinimizedToggled,
    toastAdded,
    toastRemoved
} = appSlice.actions

export default appSlice.reducer
