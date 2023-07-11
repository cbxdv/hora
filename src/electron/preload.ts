import { ipcRenderer, contextBridge } from 'electron'

import { IAppSettings } from '@appTypes/AppInterfaces'
import { ITTDiskData } from '@appTypes/TimetableInterfaces'

import { ipcHandlerTypes as ipc } from './electronConstants'

export const api = {
    // General
    getAppVersion: () => ipcRenderer.invoke(ipc.getAppVersion),
    sendNotification: (data: { title: string; body: string }) => ipcRenderer.invoke(ipc.sendNotification, data),

    // Theme
    getOSTheme: () => <Promise<string>>ipcRenderer.invoke(ipc.getOSTheme),

    // App
    fetchAppSettingsFromDisk: () => <Promise<IAppSettings>>ipcRenderer.invoke(ipc.fetchAppSettingsFromDisk),
    saveAppSettingsToDisk: (data: IAppSettings) => ipcRenderer.invoke(ipc.saveAppSettingsToDisk, data),
    openRepoLink: () => ipcRenderer.invoke(ipc.openRepoLink),

    // Startup
    enableAutoLogin: () => ipcRenderer.invoke(ipc.enableAutoLogin),
    disableAutoLogin: () => ipcRenderer.invoke(ipc.disableAutoLogin),

    // Timetable
    fetchTTDataFromDisk: () => <Promise<ITTDiskData>>ipcRenderer.invoke(ipc.fetchTTDataFromDisk),
    saveTTDataToDisk: (data: ITTDiskData) => ipcRenderer.invoke(ipc.saveTTDataToDisk, data)
}

contextBridge.exposeInMainWorld(`api`, api)
