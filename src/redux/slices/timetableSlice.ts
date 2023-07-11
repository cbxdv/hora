import { createSlice } from '@reduxjs/toolkit'

import { nanoid } from 'nanoid'

import { ITimeBlock, TimeBlockNullPayload, TimeBlockPayload } from '@appTypes/TimeBlockInterfaces'
import { TTNotifyType } from '@appTypes/TimetableInterfaces'
import {
    TTBlockAddedPayload,
    TTBlockDeletedPayload,
    TTBlockUpdatedPayload,
    TTCancellationPayload,
    TTDayIdPayload,
    TTFormCacheTimeUpdated,
    TTFormCacheUpdatedPayload,
    TTInitPayload,
    TTNotifyToggledPayload,
    TTNotifyUpdatedPayload,
    TTSubDayAddedPayload,
    TTSubjectsUpdatedPayload
} from '@appTypes/TimetablePayloadTypes'

import { TimetableIS } from '@redux/initialStates'

const timetableSlice = createSlice({
    name: `timetable`,
    initialState: TimetableIS,
    reducers: {
        ttInitialized(state, action: TTInitPayload) {
            const { blocks, settings, allocations } = action.payload
            state.blocks = blocks
            state.settings = settings
            state.allocations = allocations
        },

        ttBlockAdded(state, action: TTBlockAddedPayload) {
            const { block, isSubDay } = action.payload
            const dayID = block.startTime.day
            // A new ID is assigned for each new block
            const newBlock: ITimeBlock = {
                id: nanoid(),
                ...block
            }
            // If a substituted day, then block pushed to the allocations
            if (isSubDay) {
                if (state.allocations.subDays[dayID].subWith != null) {
                    state.allocations.subDays[dayID].blocks.push(newBlock)
                }
            } else {
                // else block pushed to the main blocks
                state.blocks[dayID].push(newBlock)
            }
            // Closing the form and resetting status values
            state.statuses.isBlockFormVisible = false
            state.statuses.subDayToOpenBlockForm = null
            state.statuses.blockToBeDuplicated = null
        },

        ttBlockDeleted(state, action: TTBlockDeletedPayload) {
            const { day, id, isSubDay } = action.payload
            // If a substituted day, then block deleted from the allocations
            if (isSubDay) {
                // Deleting the block
                if (state.allocations.subDays[day].subWith !== null) {
                    state.allocations.subDays[day].blocks = state.allocations.subDays[day].blocks.filter(
                        block => block.id !== id
                    )
                }
                // Deleting cancellations
                let oldCanceled = state.allocations.subDays[day].canceled
                oldCanceled = state.allocations.subDays[day].canceled.filter(blockId => blockId !== id)
                state.allocations.subDays[day].canceled = oldCanceled
            } else {
                // Deleting the block
                state.blocks[day] = state.blocks[day].filter(block => block.id !== id)
                // Deleting cancellations
                state.allocations.canceledBlocks = state.allocations.canceledBlocks.filter(oldId => oldId !== id)
            }
            // Closing the form and resetting status values
            state.statuses.isBlockFormVisible = false
            state.statuses.selectedBlock = null
            state.statuses.subDayToOpenBlockForm = null
            // Updating the header block if needed
            if (state.statuses.headerBlock && state.statuses.headerBlock.id === id) {
                state.statuses.headerBlock = null
            }
        },

        ttBlockUpdated(state, action: TTBlockUpdatedPayload) {
            const { oldBlock, newBlock, isSubDay } = action.payload
            const id = oldBlock.id
            const oldDay = oldBlock.startTime.day
            const newDay = newBlock.startTime.day
            // If a substituted day, then block updated in the allocations
            if (isSubDay) {
                if (state.allocations.subDays[newDay].subWith != null) {
                    let oldBlocks = state.allocations.subDays[newDay].blocks
                    // Deleting old block
                    oldBlocks = oldBlocks.filter(block => block.id !== id)
                    // Adding new block
                    oldBlocks.push(newBlock)
                    state.allocations.subDays[newDay].blocks = oldBlocks
                    // Deleting cancellations
                    let oldCanceled = state.allocations.subDays[newDay].canceled
                    oldCanceled = oldCanceled.filter(oldId => oldId !== id)
                    state.allocations.subDays[newDay].canceled = oldCanceled
                }
            } else {
                // Deleting old block
                state.blocks[oldDay] = state.blocks[oldDay].filter(block => block.id !== id)
                // Adding new block
                state.blocks[newDay].push(newBlock)
                // Deleting cancellations
                state.allocations.canceledBlocks = state.allocations.canceledBlocks.filter(oldId => oldId !== id)
            }
            // Closing the form and resetting status values
            state.statuses.isBlockFormVisible = false
            state.statuses.selectedBlock = null
            state.statuses.subDayToOpenBlockForm = null
            // Updating the header block if needed
            if (state.statuses.headerBlock && state.statuses.headerBlock.id === id) {
                state.statuses.headerBlock = newBlock
            }
        },

        ttBlocksCleared(state) {
            state.blocks = TimetableIS.blocks
            state.allocations = TimetableIS.allocations
            state.formCache.subjects = TimetableIS.formCache.subjects
        },

        ttBlockFormedOpened(state) {
            state.statuses.isBlockFormVisible = true
        },

        ttBlockFormClosed(state) {
            state.statuses.isBlockFormVisible = false
            state.statuses.selectedBlock = null
            state.statuses.blockToBeDuplicated = null
            state.statuses.subDayToOpenBlockForm = null
        },

        ttSubFormOpened(state) {
            state.statuses.isSubFormVisible = true
        },

        ttSubFormClosed(state) {
            state.statuses.isSubFormVisible = false
            state.statuses.dayToBeOpenSubForm = null
        },

        ttSelectedBlockUpdated(state, action: TimeBlockPayload) {
            state.statuses.selectedBlock = action.payload
        },

        ttDayToShowToggled(state, action: TTDayIdPayload) {
            const dayId = action.payload
            state.settings.daysToShow[dayId] = !state.settings.daysToShow[dayId]
        },

        ttNotificationToggled(state, action: TTNotifyToggledPayload) {
            const type = action.payload

            if (type === TTNotifyType.Start) {
                state.settings.notifyStart = !state.settings.notifyStart
            } else if (type === TTNotifyType.End) {
                state.settings.notifyEnd = !state.settings.notifyEnd
            }
        },

        ttNotifyBeforeUpdated(state, action: TTNotifyUpdatedPayload) {
            const { type, value } = action.payload
            if (type === TTNotifyType.Start) {
                state.settings.notifyStartBefore = value
            } else if (type === TTNotifyType.End) {
                state.settings.notifyEndBefore = value
            }
        },

        ttShowCurrentTimeToggled(state) {
            state.settings.showCurrentTimeInHeader = !state.settings.showCurrentTimeInHeader
        },

        ttShowCurrentBlockToggled(state) {
            state.settings.showCurrentBlockInHeader = !state.settings.showCurrentBlockInHeader
        },

        ttHeaderBlockUpdated(state, action: TimeBlockNullPayload) {
            state.statuses.headerBlock = action.payload
        },

        ttDupBlockUpdated(state, action: TimeBlockPayload) {
            state.statuses.blockToBeDuplicated = action.payload
        },

        ttFormCacheUpdated(state, action: TTFormCacheUpdatedPayload) {
            state.formCache = action.payload
        },

        ttSubjectsUpdated(state, action: TTSubjectsUpdatedPayload) {
            state.formCache.subjects = action.payload
        },

        ttFormCacheDayUpdated(state, action: TTDayIdPayload) {
            state.formCache.day = action.payload
        },

        ttFormCacheTimeUpdated(state, action: TTFormCacheTimeUpdated) {
            const { startTime, endTime } = action.payload
            state.formCache.startTime = startTime
            state.formCache.endTime = endTime
        },

        ttSubDayToOpenBlockFormUpdated(state, action: TTDayIdPayload) {
            state.statuses.subDayToOpenBlockForm = action.payload
        },

        ttDayToOpenSubFormUpdated(state, action: TTDayIdPayload) {
            state.statuses.dayToBeOpenSubForm = action.payload
        },

        ttSubDayAdded(state, action: TTSubDayAddedPayload) {
            const { subTo, subWith } = action.payload
            // A new list of blocks for substitution
            const newBlocks: ITimeBlock[] = []
            // Iterating and replacing the ids of the blocks
            state.blocks[subWith].forEach(block => {
                newBlocks.push({
                    ...block,
                    id: nanoid(),
                    startTime: {
                        ...block.startTime,
                        day: subTo
                    },
                    endTime: {
                        ...block.endTime,
                        day: subTo
                    }
                })
            })
            // Updating the properties of the sub day
            state.allocations.subDays[subTo] = {
                blocks: newBlocks,
                canceled: [],
                subWith
            }
            // Closing the substitution form
            state.statuses.isSubFormVisible = false
            state.statuses.dayToBeOpenSubForm = null
        },

        ttSubDayDeleted(state, action: TTDayIdPayload) {
            // Explicitly deleting blocks objects in the allocations
            const subDay = state.allocations.subDays[action.payload]
            for (let i = 0; i < subDay.blocks.length; i++) {
                delete subDay.blocks[i]
            }
            // Resetting the substitution day properties
            state.allocations.subDays[action.payload] = {
                subWith: null,
                blocks: [],
                canceled: []
            }
        },

        ttCancellationAdded(state, action: TTCancellationPayload) {
            const { blockId, subDay } = action.payload
            // If a substituted day, cancellation is pushed in the allocations
            if (subDay != null) {
                // Extracting the substitution day
                let oldCanceled = state.allocations.subDays[subDay].canceled
                // Deleting the day id if already exists in cancellation
                oldCanceled = state.allocations.subDays[subDay].canceled.filter(id => blockId !== id)
                // Pushing the block id for cancellation
                oldCanceled.push(blockId)

                state.allocations.subDays[subDay].canceled = oldCanceled
            } else {
                // Deleting the day id if already exists in cancellation
                state.allocations.canceledBlocks = state.allocations.canceledBlocks.filter(oldId => oldId !== blockId)
                // Pushing the block id for cancellation
                state.allocations.canceledBlocks.push(blockId)
            }
        },

        ttCancellationDeleted(state, action: TTCancellationPayload) {
            const { blockId, subDay } = action.payload
            // If a substituted day, cancellation is deleted from the allocations
            if (subDay != null) {
                let oldCanceled = state.allocations.subDays[subDay].canceled
                oldCanceled = state.allocations.subDays[subDay].canceled.filter(id => blockId !== id)
                state.allocations.subDays[subDay].canceled = oldCanceled
            } else {
                state.allocations.canceledBlocks = state.allocations.canceledBlocks.filter(oldId => oldId !== blockId)
            }
        }
    }
})

export const {
    ttInitialized,
    ttBlockAdded,
    ttBlockDeleted,
    ttBlockUpdated,
    ttBlocksCleared,
    ttBlockFormedOpened,
    ttBlockFormClosed,
    ttSubFormOpened,
    ttSubFormClosed,
    ttSelectedBlockUpdated,
    ttDayToShowToggled,
    ttNotificationToggled,
    ttNotifyBeforeUpdated,
    ttShowCurrentTimeToggled,
    ttShowCurrentBlockToggled,
    ttHeaderBlockUpdated,
    ttDupBlockUpdated,
    ttFormCacheUpdated,
    ttSubjectsUpdated,
    ttFormCacheDayUpdated,
    ttFormCacheTimeUpdated,
    ttSubDayToOpenBlockFormUpdated,
    ttDayToOpenSubFormUpdated,
    ttSubDayAdded,
    ttSubDayDeleted,
    ttCancellationAdded,
    ttCancellationDeleted
} = timetableSlice.actions

export default timetableSlice.reducer
