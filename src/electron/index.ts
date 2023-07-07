import { app, BrowserWindow, nativeTheme } from 'electron'

import { nativeThemeHandler } from './electronTheme'
import { createTray, updateTrayIcon } from './electronTray'
import { createWindow, showWindow } from './electronWindow'

// Disables electron security warnings
process.env[`ELECTRON_DISABLE_SECURITY_WARNINGS`] = `true`

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require(`electron-squirrel-startup`)) {
    app.quit()
}

// Requests and makes sure that only one instance is available
const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
    // If already a process is running, then quit
    app.quit()
} else {
    app.on(`second-instance`, () => {
        // Focussing the initially created instance window
        showWindow()
    })
}

// Functions at the start of the app
app.whenReady().then(() => {
    createWindow()
    createTray()
})

// When no windows are available and still the app is running
// create a new window
app.on(`activate`, () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    } else {
        showWindow()
    }
})

// Handles updating the theme when the theme of OS changes
nativeTheme.on(`updated`, () => {
    nativeThemeHandler()
    updateTrayIcon()
})

// Handles IPC methods
import './ipcHandlers'
