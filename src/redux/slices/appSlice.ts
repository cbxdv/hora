import { createSlice } from '@reduxjs/toolkit'

import { AppThemes, AppInitPayload, AppThemePayload, Themes } from '@appTypes/AppInterfaces'

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
            state.statuses.isSettingsVisible = true
        },

        appSettingsClosed(state) {
            state.statuses.isSettingsVisible = false
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
        appNotificationsToggled(state) {
            state.settings.notifications = !state.settings.notifications
        }
    }
})

export const {
    appStarted,
    appInitialized,
    appSettingsOpened,
    appSettingsClosed,
    appThemeChanged,
    appThemeToggled,
    appNotificationsToggled
} = appSlice.actions

export default appSlice.reducer
