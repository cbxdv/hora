import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit'
import { IState } from '../@types/StateInterfaces'
import {
    blockAdded,
    blockDeleted,
    blockUpdated,
    blocksCleared,
    selectAllBlocks,
    selectBlockByCurrentDay,
    selectTimetableSettings,
    timetableInitialize,
    toggleDaysToShow,
    toggleTTNotification,
    updateTTFormCache,
    updateTTNotifyBefore,
    updateTTSubjects
} from './slices/timetableSlice'
import {
    appInitialized,
    appStarted,
    changeTheme,
    toggleMinimizeOnClose,
    toggleOpenAtStartup,
    toggleNotifications,
    toggleOpenMinimized,
    selectOpenAtStartup,
    selectAppNotifications,
    selectAppSettings,
    toggleTheme
} from './slices/appSlice'
import { normalizeAppData, normalizeTimetableData } from '../utilities/storeUtils'
import { themeTypes, IAppSettings } from '../@types/AppInterfaces'
import { ITimetableDiskData, ITimetableFormCache, ITimetableSubject } from '../@types/TimetableInterfaces'
import { initializeServiceData, selectNotificationData, updateServiceData } from './slices/serviceSlice'
import { ITimeBlock, dayIdTypes } from '../@types/TimeBlockInterfaces'
import { generateNotifObjects, startNS, stopNS } from '../utilities/notificationsUtils'
import { INotifObject, notifyPropertiesType } from '../@types/ServiceInterfaces'
import { estimateNextBlock, generateSubjects, updateSubjects } from '../utilities/timetableUtils'

const listenerMiddleware = createListenerMiddleware<IState>()

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

        const blocksForNotification: ITimeBlock[] = timetableData.blocks[new Date().getDay() as dayIdTypes]
        const notifConfigs: notifyPropertiesType = {
            notifyStart: timetableData.settings.notifyStart,
            notifyStartBefore: timetableData.settings.notifyStartBefore,
            notifyEnd: timetableData.settings.notifyEnd,
            notifyEndBefore: timetableData.settings.notifyEndBefore
        }
        const notifObjects: INotifObject[] = generateNotifObjects(blocksForNotification, notifConfigs)
        const timetableSubjects: ITimetableSubject[] = generateSubjects(timetableData.blocks)

        // Populate state with data
        listenerApi.dispatch(timetableInitialize(timetableData))
        listenerApi.dispatch(updateTTSubjects(timetableSubjects))
        listenerApi.dispatch(initializeServiceData(notifObjects))
        listenerApi.dispatch(
            appInitialized({
                osTheme: osTheme,
                showingTheme,
                settings: appSettings
            })
        )
    }
})

// Listener for storing timetable & updating service data
listenerMiddleware.startListening({
    matcher: isAnyOf(blockAdded, blockDeleted, blockUpdated, blocksCleared, toggleTTNotification, updateTTNotifyBefore),
    effect: (_, listenerApi) => {
        const state = listenerApi.getState()
        const blocks = selectBlockByCurrentDay(state)
        const notifConfigs: notifyPropertiesType = {
            notifyStart: state.timetable.settings.notifyStart,
            notifyStartBefore: state.timetable.settings.notifyStartBefore,
            notifyEnd: state.timetable.settings.notifyEnd,
            notifyEndBefore: state.timetable.settings.notifyEndBefore
        }
        const notifObjects = generateNotifObjects(blocks, notifConfigs)
        listenerApi.dispatch(updateServiceData(notifObjects))
    }
})

// Listener for notifications service
listenerMiddleware.startListening({
    matcher: isAnyOf(appInitialized, updateServiceData, toggleNotifications),
    effect: (_, listenerApi) => {
        const state = listenerApi.getState()
        const shouldNotify = selectAppNotifications(state)
        if (shouldNotify) {
            const blocks = selectNotificationData(state)
            startNS(blocks)
        } else {
            stopNS()
        }
    }
})

// Listener for storing app settings
listenerMiddleware.startListening({
    matcher: isAnyOf(
        changeTheme,
        toggleNotifications,
        toggleMinimizeOnClose,
        toggleOpenAtStartup,
        toggleOpenMinimized,
        toggleTheme
    ),
    effect: (_, listenerApi) => {
        const settings = selectAppSettings(listenerApi.getState())
        api.saveAppSettingsToDisk(settings)
    }
})

// Listener for storing timetable settings
listenerMiddleware.startListening({
    matcher: isAnyOf(toggleDaysToShow, toggleTTNotification, updateTTNotifyBefore),
    effect: (_, listenerApi) => {
        const settings = selectTimetableSettings(listenerApi.getState())
        api.saveTTSettingsToDisk(settings)
    }
})

// Listener for timetable
listenerMiddleware.startListening({
    matcher: isAnyOf(blockAdded, blockDeleted, blockUpdated, blocksCleared),
    effect: (_, listenerApi) => {
        const blocks = selectAllBlocks(listenerApi.getState())
        api.saveTTBlocksToDisk(blocks)
    }
})

// Listener for auto login
listenerMiddleware.startListening({
    actionCreator: toggleOpenAtStartup,
    effect: (_, listenerApi) => {
        const openAtStartup = selectOpenAtStartup(listenerApi.getState())
        if (openAtStartup) {
            api.enableAutoLogin()
        } else {
            api.disableAutoLogin()
        }
    }
})

// Listener for updating form cache
listenerMiddleware.startListening({
    actionCreator: blockAdded,
    effect: (action, listenerApi) => {
        const state = listenerApi.getState()
        const cache = estimateNextBlock(action.payload)
        const estimatedCache: ITimetableFormCache = {
            ...cache,
            subjects: state.timetable.formCache.subjects
        }
        listenerApi.dispatch(updateTTFormCache(estimatedCache))
    }
})

// Listener for updating subjects
listenerMiddleware.startListening({
    matcher: isAnyOf(blockAdded, blockUpdated),
    effect: (action, listenerApi) => {
        const state = listenerApi.getState()
        const oldSubjects = state.timetable.formCache.subjects
        const newSubjects = updateSubjects(oldSubjects, action.payload)
        listenerApi.dispatch(updateTTSubjects(newSubjects))
    }
})

export default listenerMiddleware.middleware
