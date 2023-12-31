import { isAnyOf } from '@reduxjs/toolkit'

import { ITimeBlockBase } from '@appTypes/TimeBlockInterfaces'
import { ITTDiskData } from '@appTypes/TimetableInterfaces'

import { AppListeners } from '@redux/listeners'
import {
    selectTTAllBlocks,
    selectTTAllocations,
    selectTTFormCache,
    selectTTSettings
} from '@redux/selectors/timetableSelectors'
import { serviceRefreshed } from '@redux/slices/serviceSlice'
import {
    ttBlockAdded,
    ttBlockDeleted,
    ttBlockUpdated,
    ttBlocksCleared,
    ttCancellationAdded,
    ttCancellationDeleted,
    ttDayToShowToggled,
    ttFormCacheUpdated,
    ttNotificationToggled,
    ttNotifyBeforeUpdated,
    ttShowCurrentBlockToggled,
    ttShowCurrentTimeToggled,
    ttSubDayAdded,
    ttSubDayDeleted
} from '@redux/slices/timetableSlice'

import { normalizeObject } from '@utils/objectUtils'
import { generateFormCache } from '@utils/timetableUtils'

const timetableListeners: AppListeners = {
    // Listener for storing timetable data
    ttDataSaveListener(startListening) {
        startListening({
            matcher: isAnyOf(
                ttBlockAdded,
                ttBlockDeleted,
                ttBlockUpdated,
                ttBlocksCleared,
                ttDayToShowToggled,
                ttNotificationToggled,
                ttNotifyBeforeUpdated,
                ttShowCurrentTimeToggled,
                ttShowCurrentBlockToggled,
                ttSubDayAdded,
                ttSubDayDeleted,
                ttCancellationAdded,
                ttCancellationDeleted
            ),
            effect: (_, listenerApi) => {
                const state = listenerApi.getState()
                let data: ITTDiskData = {
                    blocks: selectTTAllBlocks(state),
                    allocations: selectTTAllocations(state),
                    settings: selectTTSettings(state)
                }
                data = normalizeObject(data)
                api.saveTTDataToDisk(data)
            }
        })
    },

    // Listener for updating service data
    ttServiceDataUpdateListener(startListening) {
        startListening({
            matcher: isAnyOf(
                ttBlockAdded,
                ttBlockDeleted,
                ttBlockUpdated,
                ttBlocksCleared,
                ttNotificationToggled,
                ttNotifyBeforeUpdated,
                ttSubDayAdded,
                ttSubDayDeleted,
                ttCancellationAdded,
                ttCancellationDeleted
            ),
            effect: (_, listenerApi) => {
                listenerApi.dispatch(serviceRefreshed())
            }
        })
    },

    // Listener for updating form cache
    ttFormCacheUpdateListener(startListening) {
        startListening({
            matcher: isAnyOf(ttBlockAdded, ttBlockUpdated),
            effect: (action, listenerApi) => {
                const state = listenerApi.getState()
                const oldCache = selectTTFormCache(state)
                const block: ITimeBlockBase = action.payload.newBlock || action.payload.block
                const newCache = generateFormCache(oldCache, block)
                listenerApi.dispatch(ttFormCacheUpdated(newCache))
            }
        })
    }
}

export default timetableListeners
