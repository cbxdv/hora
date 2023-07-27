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
    minimizeOnClose: boolean
    openAtStartup: boolean
    openMinimized: boolean
}

export enum ToastTypes {
    Info,
    Warn,
    Danger
}

export interface IToastContent {
    id: string
    message: string
    type: ToastTypes
}
