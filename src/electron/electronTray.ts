import { Menu, Tray, app, nativeImage, nativeTheme } from 'electron'

import { logoOutlineBlack, logoOutlineWhite } from './electronImageURL'
import { showWindow } from './electronWindow'

let tray: Tray | null = null

export const createTray = () => {
    // Getting an image according to the OS theme
    const image = getTrayImage()

    // Creating a tray with image
    tray = new Tray(image)

    // Setting the tooltip to show the app name
    tray.setToolTip(`hora`)

    // A small menu for the context menu
    const trayMenu = Menu.buildFromTemplate([
        {
            label: `Show`,
            click() {
                showWindow()
            }
        },
        {
            label: `Exit`,
            click() {
                app.exit()
            }
        }
    ])

    // Set menu for the tray
    tray.setContextMenu(trayMenu)

    // In case of Windows, clicking the icon once, can open the app
    if (process.platform === `win32`) {
        tray.on(`click`, () => {
            showWindow()
        })
    }

    return tray
}

/**
 * Creates a new NativeImage based on the theme of the OS
 * @returns A `NativeImage` instance
 */
const getTrayImage = () => {
    const isDark = nativeTheme.shouldUseDarkColors
    if (isDark) {
        return nativeImage.createFromDataURL(logoOutlineWhite)
    } else {
        return nativeImage.createFromDataURL(logoOutlineBlack)
    }
}

/**
 * Destroys the current tray and creates a new one
 */
export const updateTrayIcon = () => {
    if (tray == null) {
        return
    }
    tray.destroy()
    createTray()
}
