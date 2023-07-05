import { PayloadAction } from '@reduxjs/toolkit'

export type themeTypes = 'light' | 'dark'

export type appThemeTypes = themeTypes | 'system'

export type IAppInitPayload = PayloadAction<{
    osTheme: themeTypes
    showingTheme: themeTypes
    settings: IAppSettings
}>

export type IAppThemeChangePayload = PayloadAction<appThemeTypes>

export interface IAppSettings {
    theme: appThemeTypes
    notifications: boolean
    minimizeOnClose: boolean
    openAtStartup: boolean
    openMinimized: boolean
}
