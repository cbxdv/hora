import { PayloadAction } from '@reduxjs/toolkit'

export enum Themes {
    Light = `light`,
    Dark = `dark`
}

export enum AppThemes {
    Light = `light`,
    Dark = `dark`,
    System = `system`
}

export interface IAppSettings {
    theme: AppThemes
    notifications: boolean
}

export type AppInitPayload = PayloadAction<{
    osTheme: Themes
    showingTheme: Themes
    settings: IAppSettings
}>

export type AppThemePayload = PayloadAction<AppThemes>
