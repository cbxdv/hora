import { AppThemes, IAppSettings, Themes } from '@appTypes/AppInterfaces'
import { ITTDiskData, ITTSubject } from '@appTypes/TimetableInterfaces'
import { AppIS } from '@redux/initialStates'

import { AppListeners } from '@redux/listeners'
import { appInitialized, appStarted } from '@redux/slices/appSlice'
import { serviceRefreshed } from '@redux/slices/serviceSlice'
import { ttInitialized, ttSubjectsUpdated } from '@redux/slices/timetableSlice'

import { normalizeAppData, normalizeTimetableData } from '@utils/storeUtils'
import { generateSubjects } from '@utils/timetableUtils'

export enum StorageString {
    Timetable = `timetable`,
    App = `app`
}

// Listener to initialize app with data
const initialListener: AppListeners = {
    initialListener(startListening) {
        startListening({
            actionCreator: appStarted,
            effect: (_, listenerApi) => {
                let osTheme: Themes = AppIS.statuses.osTheme
                let showingTheme: Themes = AppIS.statuses.showingTheme
                let appSettings: IAppSettings
                let timetableData: ITTDiskData

                try {
                    timetableData = JSON.parse(localStorage.getItem(StorageString.Timetable) || `{}`) as ITTDiskData
                    appSettings = JSON.parse(localStorage.getItem(StorageString.App) || `{}`) as IAppSettings
                    const osThemeResponse = window.matchMedia(`(prefers-color-scheme: dark)`)
                    if (osThemeResponse.matches) {
                        osTheme = Themes.Dark
                    } else {
                        osTheme = Themes.Light
                    }
                } catch {
                    console.error(`Error fetching data`)
                    return
                }

                timetableData = normalizeTimetableData(timetableData)
                appSettings = normalizeAppData(appSettings)

                if (appSettings.theme === AppThemes.System) {
                    showingTheme = osTheme
                } else {
                    if (appSettings.theme === AppThemes.Light) {
                        showingTheme = Themes.Light
                    } else {
                        showingTheme = Themes.Dark
                    }
                }
                const timetableSubjects: ITTSubject[] = generateSubjects(timetableData.blocks)

                // Populate state with data
                listenerApi.dispatch(ttInitialized(timetableData))
                listenerApi.dispatch(ttSubjectsUpdated(timetableSubjects))
                listenerApi.dispatch(
                    appInitialized({
                        osTheme: osTheme,
                        showingTheme,
                        settings: appSettings
                    })
                )
                listenerApi.dispatch(serviceRefreshed())
            }
        })
    }
}

export default initialListener
