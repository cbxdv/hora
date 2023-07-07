import { createSlice } from '@reduxjs/toolkit'

import { IAppInitPayload, IAppThemeChangePayload } from '@appTypes/AppInterfaces'
import { IState } from '@appTypes/StateInterfaces'

import { appIS } from '@redux/initialStates'

const appSlice = createSlice({
    name: `app`,
    initialState: appIS,
    reducers: {
        appStarted(state) {
            state.statuses.isLoading = true
        },
        appInitialized(state, action: IAppInitPayload) {
            state.settings = action.payload.settings
            state.statuses.showingTheme = action.payload.showingTheme
            state.statuses.osTheme = action.payload.osTheme
            state.statuses.isLoading = false
        },
        showSettings(state) {
            state.statuses.isSettingsVisible = true
        },
        hideSettings(state) {
            state.statuses.isSettingsVisible = false
        },
        changeTheme(state, action: IAppThemeChangePayload) {
            state.settings.theme = action.payload
            if (action.payload === `system`) {
                state.statuses.showingTheme = state.statuses.osTheme
            } else {
                state.statuses.showingTheme = action.payload
            }
        },
        toggleTheme(state) {
            if (state.settings.theme === `light`) {
                state.settings.theme = `dark`
                state.statuses.showingTheme = `dark`
            } else if (state.settings.theme === `dark`) {
                state.settings.theme = `light`
                state.statuses.showingTheme = `light`
            }
        },
        toggleMinimizeOnClose(state) {
            state.settings.minimizeOnClose = !state.settings.minimizeOnClose
        },
        toggleOpenAtStartup(state) {
            state.settings.openAtStartup = !state.settings.openAtStartup
        },
        toggleNotifications(state) {
            state.settings.notifications = !state.settings.notifications
        },
        toggleOpenMinimized(state) {
            state.settings.openMinimized = !state.settings.openMinimized
        }
    }
})

export default appSlice.reducer

export const {
    appStarted,
    appInitialized,
    showSettings,
    hideSettings,
    changeTheme,
    toggleTheme,
    toggleMinimizeOnClose,
    toggleOpenAtStartup,
    toggleNotifications,
    toggleOpenMinimized
} = appSlice.actions

export const selectIsLoading = (state: IState) => state.app.statuses.isLoading
export const selectTheme = (state: IState) => state.app.settings.theme
export const selectShowingTheme = (state: IState) => state.app.statuses.showingTheme
export const selectIsSettingsVisible = (state: IState) => state.app.statuses.isSettingsVisible
export const selectVersion = (state: IState) => state.app.appInfo.version
export const selectAppSettings = (state: IState) => state.app.settings
export const selectOpenAtStartup = (state: IState) => state.app.settings.openAtStartup
export const selectAppNotifications = (state: IState) => state.app.settings.notifications
