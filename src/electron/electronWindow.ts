import { BrowserWindow, app, nativeImage } from 'electron'

import isDev from 'electron-is-dev'
import Store from 'electron-store'

import { appStoreTypes } from './electronConstants'
import { appIS } from '../redux/initialStates'

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

const store = new Store()

export const createWindow = async () => {
    // Icon for application
    const image = nativeImage.createFromPath(`build/icon.png`)

    // Create the browser window serving main content
    const mainWindow = new BrowserWindow({
        height: 700,
        width: 1200,
        minHeight: 600,
        minWidth: 750,
        autoHideMenuBar: true,
        center: true,
        title: `hora`,
        show: false,
        icon: image,
        webPreferences: {
            preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
            devTools: isDev,
            contextIsolation: true,
            backgroundThrottling: false
        }
    })

    // and load the index.html of the app.
    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

    // Open the DevTools
    if (isDev) {
        mainWindow.webContents.openDevTools()
    }

    // Setting the menu bar to be hidden
    mainWindow.setMenuBarVisibility(false)

    // Show main window only if it is ready
    mainWindow.on(`ready-to-show`, () => startUpWindow(mainWindow))

    // When the close button is pressed
    mainWindow.on(`close`, (e) => {
        e.preventDefault()
        closeWindow()
    })

    return mainWindow
}

const closeWindow = async () => {
    const mainWindow = BrowserWindow.getAllWindows()[0]

    // Hide dock icon in macOS
    if (process.platform === `darwin`) {
        app.dock.hide()
    }

    // Get configs from disk
    const shouldMinimize = await store.get(appStoreTypes.minimizeOnClose, appIS.settings.minimizeOnClose)

    // Defaults to minimize
    if (shouldMinimize) {
        mainWindow.hide()
    } else {
        app.exit()
    }
}

const startUpWindow = async (mainWindow: BrowserWindow) => {
    // Fetching whether to use open minimized
    const openMinimized = await store.get(appStoreTypes.openMinimized)

    // If open minimized then return from the function
    if (openMinimized) {
        // If in macOS, hide the dock icon
        if (process.platform === `darwin`) {
            app.dock.hide()
        }
        return
    }
    mainWindow.show()
}

export const showWindow = () => {
    const window = BrowserWindow.getAllWindows()[0]
    if (window) {
        window.show()
    }
}

export const registerLogin = () => {
    const loginItem = app.getLoginItemSettings().openAtLogin
    if (loginItem === false) {
        app.setLoginItemSettings({
            openAtLogin: true,
            name: `hora`
        })
    }
}

export const removeLogin = () => {
    const loginItem = app.getLoginItemSettings().openAtLogin
    if (loginItem === true) {
        app.setLoginItemSettings({
            openAtLogin: false,
            enabled: false
        })
    }
}
