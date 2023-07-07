import { ipcRenderer, contextBridge } from 'electron'

import { themeTypes, IAppSettings } from '@appTypes/AppInterfaces'
import { IBlocks } from '@appTypes/TimeBlockInterfaces'
import { ITimetableDiskData, ITimetableSettings } from '@appTypes/TimetableInterfaces'

import { ipcHandlerTypes as ipc } from './electronConstants'

export const api = {
    // General
    getAppVersion: () => ipcRenderer.invoke(ipc.getAppVersion),
    sendNotification: (data: { title: string; body: string }) => ipcRenderer.invoke(ipc.sendNotification, data),

    // Theme
    getOSTheme: () => <Promise<themeTypes>>ipcRenderer.invoke(ipc.getOSTheme),

    // App
    fetchAppSettingsFromDisk: () => <Promise<IAppSettings>>ipcRenderer.invoke(ipc.fetchAppSettingsFromDisk),
    saveAppSettingsToDisk: (data: IAppSettings) => ipcRenderer.invoke(ipc.saveAppSettingsToDisk, data),
    openRepoLink: () => ipcRenderer.invoke(ipc.openRepoLink),

    // Startup
    enableAutoLogin: () => ipcRenderer.invoke(ipc.enableAutoLogin),
    disableAutoLogin: () => ipcRenderer.invoke(ipc.disableAutoLogin),

    // Timetable
    fetchTTDataFromDisk: () => <Promise<ITimetableDiskData>>ipcRenderer.invoke(ipc.fetchTTDataFromDisk),
    saveTTBlocksToDisk: (data: IBlocks) => ipcRenderer.invoke(ipc.saveTTBlocksToDisk, data),
    saveTTSettingsToDisk: (data: ITimetableSettings) => ipcRenderer.invoke(ipc.saveTTSettingsToDisk, data)
}

contextBridge.exposeInMainWorld(`api`, api)
