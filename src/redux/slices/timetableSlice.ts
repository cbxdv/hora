import { createSlice } from '@reduxjs/toolkit'

import { nanoid } from 'nanoid'

import { IState } from '@appTypes/StateInterfaces'
import {
    DayID,
    ITimeBlock,
    ITimeBlockAddPayload,
    ITimeBlockDeletePayload,
    ITimeBlockPayload,
    ITimeBlockUpdatePayload
} from '@appTypes/TimeBlockInterfaces'
import {
    ITTBlockCancellationPayload,
    ITTDaySubAddPayload,
    ITTDaySubDeletePayload,
    ITTDayToSubUpdatePayload,
    ITTFormCacheDayUpdatePayload,
    ITimetableFormCacheUpdatePayload,
    ITimetableInitPayload,
    ITimetableNotifyUpdatePayload,
    ITimetableSubjectsUpdatePayload,
    ITimetableToggleNotifyPayload,
    IUpdateDaysPayload
} from '@appTypes/TimetableInterfaces'
import { timetableIS } from '@redux/initialStates'

const timetableSlice = createSlice({
    name: `timetable`,
    initialState: timetableIS,
    reducers: {
        timetableInitialize(state, action: ITimetableInitPayload) {
            const { blocks, settings, allocations } = action.payload
            state.blocks = blocks
            state.settings = settings
            state.allocations = allocations
        },
        blockAdded(state, action: ITimeBlockAddPayload) {
            const { block, isDaySub } = action.payload
            const dayID = block.day
            const newBlock: ITimeBlock = {
                id: nanoid(),
                ...block
            }
            if (isDaySub) {
                if (state.allocations.daySubs[dayID].subWith != null) {
                    state.allocations.daySubs[dayID].blocks.push(newBlock)
                }
            } else {
                state.blocks[dayID].push(newBlock)
            }
            // Closing the form
            state.statuses.isBlockFormVisible = false
            state.statuses.subDayToOpenBlockForm = null
        },
        blockDeleted(state, action: ITimeBlockDeletePayload) {
            const { day, id, daySub } = action.payload
            if (daySub != null) {
                // Deleting the block
                if (state.allocations.daySubs[daySub].subWith !== null) {
                    state.allocations.daySubs[daySub].blocks = state.allocations.daySubs[daySub].blocks.filter(
                        block => block.id !== id
                    )
                }
                // Deleting cancellations
                let oldCanceled = state.allocations.daySubs[daySub].canceled
                oldCanceled = state.allocations.daySubs[daySub].canceled.filter(blockId => blockId !== id)
                state.allocations.daySubs[daySub].canceled = oldCanceled
            } else {
                // Deleting the block
                state.blocks[day] = state.blocks[day].filter(block => block.id !== id)
                // Deleting cancellations
                state.allocations.canceledBlocks = state.allocations.canceledBlocks.filter(oldId => oldId !== id)
            }
            // CLosing the form
            state.statuses.isBlockFormVisible = false
            state.statuses.selectedBlock = null
            state.statuses.subDayToOpenBlockForm = null
        },
        blockUpdated(state, action: ITimeBlockUpdatePayload) {
            const { oldBlock, newBlock, isDaySub } = action.payload
            const id = oldBlock.id
            if (isDaySub) {
                if (state.allocations.daySubs[newBlock.day].subWith != null) {
                    let oldBlocks = state.allocations.daySubs[newBlock.day].blocks
                    // Deleting old block
                    oldBlocks = oldBlocks.filter(block => block.id !== id)
                    // Adding new block
                    oldBlocks.push(newBlock)
                    state.allocations.daySubs[newBlock.day].blocks = oldBlocks
                    // Deleting cancellations
                    let oldCanceled = state.allocations.daySubs[newBlock.day].canceled
                    oldCanceled = oldCanceled.filter(oldId => oldId !== id)
                    state.allocations.daySubs[newBlock.day].canceled = oldCanceled
                }
            } else {
                // Deleting old block
                state.blocks[oldBlock.day] = state.blocks[oldBlock.day].filter(block => block.id !== id)
                // Adding new block
                state.blocks[newBlock.day].push(newBlock)
                // Deleting cancellations
                state.allocations.canceledBlocks = state.allocations.canceledBlocks.filter(oldId => oldId !== id)
            }
            // Closing the form
            state.statuses.isBlockFormVisible = false
            state.statuses.selectedBlock = null
            state.statuses.subDayToOpenBlockForm = null
        },
        blocksCleared(state) {
            state.blocks = timetableIS.blocks
        },
        showBlockForm(state) {
            state.statuses.isBlockFormVisible = true
        },
        hideBlockForm(state) {
            state.statuses.isBlockFormVisible = false
            state.statuses.selectedBlock = null
            state.statuses.blockToBeDuplicated = null
            state.statuses.subDayToOpenBlockForm = null
        },
        showSubstitutionForm(state) {
            state.statuses.isSubFormVisible = true
        },
        hideSubstitutionForm(state) {
            state.statuses.isSubFormVisible = false
        },
        updateSelectedBlock(state, action: ITimeBlockPayload) {
            state.statuses.selectedBlock = action.payload
        },
        toggleDaysToShow(state, action: IUpdateDaysPayload) {
            const dayId = action.payload
            state.settings.daysToShow[dayId] = !state.settings.daysToShow[dayId]
        },
        toggleTTNotification(state, action: ITimetableToggleNotifyPayload) {
            const type = action.payload
            if (type === `start`) {
                state.settings.notifyStart = !state.settings.notifyStart
            } else if (type === `end`) {
                state.settings.notifyEnd = !state.settings.notifyEnd
            }
        },
        updateTTNotifyBefore(state, action: ITimetableNotifyUpdatePayload) {
            const { type, value } = action.payload
            if (type === `start`) {
                state.settings.notifyStartBefore = value
            } else if (type === `end`) {
                state.settings.notifyEndBefore = value
            }
        },
        updateDuplicateBlock(state, action: ITimeBlockPayload) {
            state.statuses.blockToBeDuplicated = action.payload
        },
        updateTTFormCache(state, action: ITimetableFormCacheUpdatePayload) {
            state.formCache = action.payload
        },
        updateTTSubjects(state, action: ITimetableSubjectsUpdatePayload) {
            state.formCache.subjects = action.payload
        },
        updateTTFormCacheDay(state, action: ITTFormCacheDayUpdatePayload) {
            state.formCache.day = action.payload
        },
        updateSubDayToOpenBlockForm(state, action: ITTDayToSubUpdatePayload) {
            state.statuses.subDayToOpenBlockForm = action.payload
        },
        updateDayToOpenSubForm(state, action: ITTDayToSubUpdatePayload) {
            state.statuses.dayToBeOpenSubForm = action.payload
        },
        ttDaySubAdded(state, action: ITTDaySubAddPayload) {
            const { subTo, subWith } = action.payload
            state.allocations.daySubs[subTo] = {
                blocks: [...state.blocks[subWith]],
                canceled: [],
                subWith
            }
            state.statuses.isSubFormVisible = false
        },
        ttDaySubDeleted(state, action: ITTDaySubDeletePayload) {
            for (let i = 0; i < state.allocations.daySubs[action.payload].blocks.length; i++) {
                delete state.allocations.daySubs[action.payload].blocks[i]
            }
            state.allocations.daySubs[action.payload] = {
                subWith: null,
                blocks: [],
                canceled: []
            }
        },
        addBlockCancellation(state, action: ITTBlockCancellationPayload) {
            const { blockId, subDay } = action.payload
            if (subDay != null) {
                let oldCanceled = state.allocations.daySubs[subDay].canceled
                oldCanceled = state.allocations.daySubs[subDay].canceled.filter(id => blockId !== id)
                oldCanceled.push(blockId)
                state.allocations.daySubs[subDay].canceled = oldCanceled
            } else {
                state.allocations.canceledBlocks = state.allocations.canceledBlocks.filter(oldId => oldId !== blockId)
                state.allocations.canceledBlocks.push(blockId)
            }
        },
        deleteBlockCancellation(state, action: ITTBlockCancellationPayload) {
            const { blockId, subDay } = action.payload
            if (subDay != null) {
                let oldCanceled = state.allocations.daySubs[subDay].canceled
                oldCanceled = state.allocations.daySubs[subDay].canceled.filter(id => blockId !== id)
                state.allocations.daySubs[subDay].canceled = oldCanceled
            } else {
                state.allocations.canceledBlocks = state.allocations.canceledBlocks.filter(oldId => oldId !== blockId)
            }
        }
    }
})

export default timetableSlice.reducer

export const {
    timetableInitialize,
    blockAdded,
    blockDeleted,
    blockUpdated,
    blocksCleared,
    showBlockForm,
    hideBlockForm,
    updateSelectedBlock,
    toggleDaysToShow,
    toggleTTNotification,
    updateTTNotifyBefore,
    updateDuplicateBlock,
    updateTTFormCache,
    updateTTSubjects,
    updateTTFormCacheDay,
    showSubstitutionForm,
    hideSubstitutionForm,
    updateDayToOpenSubForm,
    ttDaySubAdded,
    ttDaySubDeleted,
    addBlockCancellation,
    deleteBlockCancellation,
    updateSubDayToOpenBlockForm
} = timetableSlice.actions

export const selectAllBlocks = (state: IState) => state.timetable.blocks
export const selectIsBlockFormVisible = (state: IState) => state.timetable.statuses.isBlockFormVisible
export const selectSelectedBlock = (state: IState) => state.timetable.statuses.selectedBlock
export const selectBlocksByDayId = (state: IState, day: DayID) => state.timetable.blocks[day]
export const selectDaysToShow = (state: IState) => state.timetable.settings.daysToShow
export const selectTimetableSettings = (state: IState) => state.timetable.settings
export const selectDuplicateBlock = (state: IState) => state.timetable.statuses.blockToBeDuplicated
export const selectFormCache = (state: IState) => state.timetable.formCache
export const selectDayToBeOpenSubForm = (state: IState) => state.timetable.statuses.dayToBeOpenSubForm
export const selectSubDayToOpenBlockForm = (state: IState) => state.timetable.statuses.subDayToOpenBlockForm
export const selectIsSubFormVisible = (state: IState) => state.timetable.statuses.isSubFormVisible
export const selectTTAllocations = (state: IState) => state.timetable.allocations
export const selectDayToSub = (state: IState, day: DayID) => state.timetable.allocations.daySubs[day]
export const selectCanceledBlocks = (state: IState) => state.timetable.allocations.canceledBlocks
export const selectSubDayCancellation = (state: IState, day: DayID) => state.timetable.allocations.daySubs[day].canceled
export const selectBlockByCurrentDayWithSub = (state: IState) => {
    const currentDay = new Date().getDay() as DayID
    const dayToBeSubbed = state.timetable.allocations.daySubs[currentDay].subWith
    if (dayToBeSubbed != null) {
        return state.timetable.allocations.daySubs[currentDay].blocks
    } else {
        return state.timetable.blocks[currentDay]
    }
}
export const selectCanceledBlocksWithSub = (state: IState) => {
    const currentDay = new Date().getDay() as DayID
    const dayToBeSubbed = state.timetable.allocations.daySubs[currentDay].subWith
    if (dayToBeSubbed != null) {
        return state.timetable.allocations.daySubs[currentDay].canceled
    } else {
        return state.timetable.allocations.canceledBlocks
    }
}
