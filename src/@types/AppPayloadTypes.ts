import { PayloadAction } from '@reduxjs/toolkit'

import { AppThemes, IAppSettings, IToastContent, Themes, ToastTypes } from './AppInterfaces'

export type AppInitPayload = PayloadAction<{
    osTheme: Themes
    showingTheme: Themes
    settings: IAppSettings
}>

export type AppThemePayload = PayloadAction<AppThemes>

export type ToastAddedPayload = PayloadAction<{
    message: string
    type: ToastTypes
}>

export type ToastContentPayload = PayloadAction<IToastContent>
