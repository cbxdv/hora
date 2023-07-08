import { IAppSettings, themeTypes } from '@appTypes/AppInterfaces'
import { INotifyObject, notifyPropertiesType } from '@appTypes/ServiceInterfaces'
import { DayID } from '@appTypes/TimeBlockInterfaces'
import { ITimetableDiskData, ITimetableSubject } from '@appTypes/TimetableInterfaces'

import { listenerMiddleware } from '@redux/listeners'
import { appInitialized, appStarted } from '@redux/slices/appSlice'
import { initializeServiceData } from '@redux/slices/serviceSlice'
import { timetableInitialize, updateTTSubjects } from '@redux/slices/timetableSlice'

import { generateNotifyObjects } from '@utils/notificationsUtils'
import { normalizeAppData, normalizeTimetableData } from '@utils/storeUtils'
import { filterNonCanceledBlocks, generateSubjects } from '@utils/timetableUtils'

// Listener to initialize app with data
listenerMiddleware.startListening({
    actionCreator: appStarted,
    effect: async (_, listenerApi) => {
        let osTheme: themeTypes = `dark`
        let showingTheme: themeTypes = `dark`
        let appSettings: IAppSettings
        let timetableData: ITimetableDiskData

        try {
            timetableData = await api.fetchTTDataFromDisk()
            appSettings = await api.fetchAppSettingsFromDisk()
            osTheme = await api.getOSTheme()
        } catch {
            console.error(`Error fetching data`)
            return
        }

        timetableData = normalizeTimetableData(timetableData)
        appSettings = normalizeAppData(appSettings)

        if (appSettings.theme === `system`) {
            showingTheme = osTheme
        } else {
            showingTheme = appSettings.theme
        }

        // Checking if the day is substituted
        const daySub = timetableData.allocations.daySubs[new Date().getDay() as DayID]
        let blocksForNotification = []
        if (daySub.subWith != null) {
            blocksForNotification = daySub.blocks
            blocksForNotification = filterNonCanceledBlocks(blocksForNotification, daySub.canceled)
        } else {
            blocksForNotification = timetableData.blocks[new Date().getDay() as DayID]
            blocksForNotification = filterNonCanceledBlocks(
                blocksForNotification,
                timetableData.allocations.canceledBlocks
            )
        }
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
