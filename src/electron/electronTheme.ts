import { BrowserWindow } from 'electron'
import Store from 'electron-store'
import { appStoreTypes } from './electronConstants'
import { createWindow } from './electronWindow'
import { appIS } from '../redux/initialStates'

const store = new Store()

// A boolean to prevent multiple event handler calls
let isThemeUpdating = false

/* Event handler called when theme of OS updates */
export const nativeThemeHandler = async () => {
    // Cancels if already processing theme
    if (isThemeUpdating) {
        return
    }

    // Locking the function
    isThemeUpdating = true

    // Get theme saved from disk
    // If no config found, then defaults to initial
    const modeFromDisk = await store.get(appStoreTypes.theme, appIS.settings.theme)

    // If theme in configs is not `system`, then releasing
    if (modeFromDisk !== 'system') {
        setTimeout(() => {
            isThemeUpdating = false
        }, 1000)
        return
    }

    // Restart window to apply changes
    const oldWindow = BrowserWindow.getAllWindows()[0]
    await createWindow()

    // Destroying the old window
    oldWindow.destroy()

    // Releasing
    setTimeout(() => {
        isThemeUpdating = false
    }, 1000)
}
