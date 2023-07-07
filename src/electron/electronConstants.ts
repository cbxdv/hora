/**
 * Contains channels of IPC Channels between main and renderer process
 */
export const ipcHandlerTypes = {
    // General
    getAppVersion: `app:version`,
    sendNotification: `app:notify`,

    // Theme
    getOSTheme: `os:theme`,

    // Repo
    openRepoLink: `app:openRepoLink`,

    // App
    fetchAppSettingsFromDisk: `appSettings:get`,
    saveAppSettingsToDisk: `appSettings:set`,

    // Startup
    enableAutoLogin: `login:enable`,
    disableAutoLogin: `login:disable`,

    // Timetable
    fetchTTDataFromDisk: `timetable:get`,
    saveTTBlocksToDisk: `timetable:set`,
    saveTTSettingsToDisk: `timetable:setSettings`
}

export const appStoreTypes = {
    settings: `app.settings`,
    theme: `app.settings.theme`,
    minimizeOnClose: `app.settings.minimizeOnClose`,
    openMinimized: `app.settings.openMinimized`
}

export const timetableStoreTypes = {
    all: `timetable`,
    blocks: `timetable.blocks`,
    settings: `timetable.settings`
}
