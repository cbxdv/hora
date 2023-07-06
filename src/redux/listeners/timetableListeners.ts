import { isAnyOf } from '@reduxjs/toolkit'
import { listenerMiddleware } from '../listeners'
import {
    blockAdded,
    blockDeleted,
    blockUpdated,
    blocksCleared,
    selectAllBlocks,
    selectBlockByCurrentDay,
    selectTimetableSettings,
    toggleDaysToShow,
    toggleTTNotification,
    updateTTFormCache,
    updateTTNotifyBefore,
    updateTTSubjects
} from '../slices/timetableSlice'
import { notifyPropertiesType } from '../../@types/ServiceInterfaces'
import { generateNotifyObjects } from '../../utilities/notificationsUtils'
import { updateServiceData } from '../slices/serviceSlice'
import { estimateNextBlock, updateSubjects } from '../../utilities/timetableUtils'
import { ITimetableFormCache } from '../../@types/TimetableInterfaces'

// Listener for timetable
listenerMiddleware.startListening({
    matcher: isAnyOf(blockAdded, blockDeleted, blockUpdated, blocksCleared),
    effect: (_, listenerApi) => {
        const blocks = selectAllBlocks(listenerApi.getState())
        api.saveTTBlocksToDisk(blocks)
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

// Listener for storing timetable & updating service data
listenerMiddleware.startListening({
    matcher: isAnyOf(blockAdded, blockDeleted, blockUpdated, blocksCleared, toggleTTNotification, updateTTNotifyBefore),
    effect: (_, listenerApi) => {
        const state = listenerApi.getState()
        const blocks = selectBlockByCurrentDay(state)
        const notifyConfigs: notifyPropertiesType = {
            notifyStart: state.timetable.settings.notifyStart,
            notifyStartBefore: state.timetable.settings.notifyStartBefore,
            notifyEnd: state.timetable.settings.notifyEnd,
            notifyEndBefore: state.timetable.settings.notifyEndBefore
        }
        const notifyObjects = generateNotifyObjects(blocks, notifyConfigs)
        listenerApi.dispatch(updateServiceData(notifyObjects))
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
