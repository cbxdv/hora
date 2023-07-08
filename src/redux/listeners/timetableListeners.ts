import { isAnyOf } from '@reduxjs/toolkit'

import { notifyPropertiesType } from '@appTypes/ServiceInterfaces'
import { ITimetableFormCache } from '@appTypes/TimetableInterfaces'

import { listenerMiddleware } from '@redux/listeners'
import { updateServiceData } from '@redux/slices/serviceSlice'
import {
    addBlockCancellation,
    blockAdded,
    blockDeleted,
    blockUpdated,
    blocksCleared,
    deleteBlockCancellation,
    selectAllBlocks,
    selectBlockByCurrentDayWithSub,
    selectCanceledBlocksWithSub,
    selectTTAllocations,
    selectTimetableSettings,
    toggleDaysToShow,
    toggleTTNotification,
    ttDaySubAdded,
    ttDaySubDeleted,
    updateTTFormCache,
    updateTTNotifyBefore,
    updateTTSubjects
} from '@redux/slices/timetableSlice'

import { generateNotifyObjects } from '@utils/notificationsUtils'
import { normalizeObject } from '@utils/objectUtils'
import { estimateNextBlock, filterNonCanceledBlocks, updateSubjects } from '@utils/timetableUtils'

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

// Listener for storing allocations
listenerMiddleware.startListening({
    matcher: isAnyOf(
        blockAdded,
        blockDeleted,
        blockUpdated,
        ttDaySubAdded,
        ttDaySubDeleted,
        addBlockCancellation,
        deleteBlockCancellation
    ),
    effect: (_, listenerApi) => {
        let allocations = selectTTAllocations(listenerApi.getState())
        allocations = normalizeObject(allocations)
        api.saveTTAllocationsToDisk(allocations)
    }
})

// Listener for updating service data
listenerMiddleware.startListening({
    matcher: isAnyOf(
        blockAdded,
        blockDeleted,
        blockUpdated,
        blocksCleared,
        toggleTTNotification,
        updateTTNotifyBefore,
        ttDaySubAdded,
        ttDaySubDeleted,
        addBlockCancellation,
        deleteBlockCancellation
    ),
    effect: (_, listenerApi) => {
        const state = listenerApi.getState()
        let blocks = selectBlockByCurrentDayWithSub(state)
        const canceledBlocks = selectCanceledBlocksWithSub(state)
        blocks = filterNonCanceledBlocks(blocks, canceledBlocks)
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
        const block = action.payload.newBlock || action.payload.block
        const newSubjects = updateSubjects(oldSubjects, block)
        listenerApi.dispatch(updateTTSubjects(newSubjects))
    }
})

// Listener for updating form cache
listenerMiddleware.startListening({
    actionCreator: blockAdded,
    effect: (action, listenerApi) => {
        const state = listenerApi.getState()
        const cache = estimateNextBlock(action.payload.block)
        const estimatedCache: ITimetableFormCache = {
            ...cache,
            subjects: state.timetable.formCache.subjects
        }
        listenerApi.dispatch(updateTTFormCache(estimatedCache))
    }
})
