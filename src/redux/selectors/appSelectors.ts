import { IState } from '@appTypes/StateInterfaces'

export const selectIsAppLoading = (state: IState) => state.app.statuses.isLoading

export const selectAppTheme = (state: IState) => state.app.settings.theme

export const selectShowingTheme = (state: IState) => state.app.statuses.showingTheme

export const selectIsAppSettingsVisible = (state: IState) => state.app.statuses.isSettingsVisible

export const selectAppSettings = (state: IState) => state.app.settings

export const selectAppNotifications = (state: IState) => state.app.settings.notifications
