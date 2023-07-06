import { ITimetableDiskData, ITimetableSubject } from '../../@types/TimetableInterfaces'
import { IAppSettings, themeTypes } from '../../@types/AppInterfaces'
import { appInitialized, appStarted } from '../slices/appSlice'
import { listenerMiddleware } from '../listeners'
import { normalizeAppData, normalizeTimetableData } from '../../utilities/storeUtils'
import { DayID } from '../../@types/TimeBlockInterfaces'
import { INotifyObject, notifyPropertiesType } from '../../@types/ServiceInterfaces'
import { generateNotifyObjects } from '../../utilities/notificationsUtils'
import { timetableInitialize, updateTTSubjects } from '../slices/timetableSlice'
import { initializeServiceData } from '../slices/serviceSlice'
import { generateSubjects } from '../../utilities/timetableUtils'

// Listener to initialize app with data
listenerMiddleware.startListening({
    actionCreator: appStarted,
    effect: async (_, listenerApi) => {
        let osTheme: themeTypes = 'dark'
        let showingTheme: themeTypes = 'dark'
        let appSettings: IAppSettings
        let timetableData: ITimetableDiskData

        try {
            timetableData = await api.fetchTTDataFromDisk()
            appSettings = await api.fetchAppSettingsFromDisk()
            osTheme = await api.getOSTheme()
        } catch {
            console.error('Error fetching data')
            return
        }

        timetableData = normalizeTimetableData(timetableData)
        appSettings = normalizeAppData(appSettings)

        if (appSettings.theme === 'system') {
            showingTheme = osTheme
        }

        const blocksForNotification = timetableData.blocks[new Date().getDay() as DayID]
        const notifyConfigs: notifyPropertiesType = {
            notifyStart: timetableData.settings.notifyStart,
            notifyStartBefore: timetableData.settings.notifyStartBefore,
            notifyEnd: timetableData.settings.notifyEnd,
            notifyEndBefore: timetableData.settings.notifyEndBefore
        }
        const notifyObjects: INotifyObject[] = generateNotifyObjects(blocksForNotification, notifyConfigs)
        const timetableSubjects: ITimetableSubject[] = generateSubjects(timetableData.blocks)

        // Populate state with data
        listenerApi.dispatch(timetableInitialize(timetableData))
        listenerApi.dispatch(updateTTSubjects(timetableSubjects))
        listenerApi.dispatch(initializeServiceData(notifyObjects))
        listenerApi.dispatch(
            appInitialized({
                osTheme: osTheme,
                showingTheme,
                settings: appSettings
            })
        )
    }
})
