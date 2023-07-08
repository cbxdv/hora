import { Notification, app, ipcMain, nativeTheme, shell } from 'electron'

import Store from 'electron-store'

import { appStoreTypes, ipcHandlerTypes, timetableStoreTypes } from './electronConstants'
import { registerLogin, removeLogin } from './electronWindow'

const store = new Store()

ipcMain.handle(ipcHandlerTypes.getAppVersion, () => {
    return app.getVersion()
})

ipcMain.handle(ipcHandlerTypes.sendNotification, (_, data: { title: string; body: string }) => {
    new Notification({
        title: data.title || ``,
        body: data.body || ``
    }).show()
})

ipcMain.handle(ipcHandlerTypes.getOSTheme, () => {
    const isDark = nativeTheme.shouldUseDarkColors
    const theme = isDark ? `dark` : `light`
    return theme
})

ipcMain.handle(ipcHandlerTypes.fetchAppSettingsFromDisk, async () => {
    const data = await store.get(appStoreTypes.settings, {})
    return data
})

ipcMain.handle(ipcHandlerTypes.saveAppSettingsToDisk, async (_, data) => {
    store.set(appStoreTypes.settings, data)
})

ipcMain.handle(ipcHandlerTypes.fetchTTDataFromDisk, async () => {
    const blocks = await store.get(timetableStoreTypes.all, {})
    return blocks
})

ipcMain.handle(ipcHandlerTypes.saveTTBlocksToDisk, (_, data) => {
    store.set(timetableStoreTypes.blocks, data)
})

ipcMain.handle(ipcHandlerTypes.saveTTSettingsToDisk, (_, data) => {
    store.set(timetableStoreTypes.settings, data)
})

ipcMain.handle(ipcHandlerTypes.saveTTAllocationsToDisk, (_, data) => {
    store.set(timetableStoreTypes.allocations, data)
})

ipcMain.handle(ipcHandlerTypes.enableAutoLogin, () => registerLogin())

ipcMain.handle(ipcHandlerTypes.disableAutoLogin, () => removeLogin())

ipcMain.handle(ipcHandlerTypes.openRepoLink, () => {
    shell.openExternal(`https://github.com/cbxdv/hora`)
})
