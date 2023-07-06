import { createSlice } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'
import { IState } from '../../@types/StateInterfaces'
import {
    ITimeBlock,
    ITimeBlockAddPayload,
    ITimeBlockDeletePayload,
    ITimeBlockPayload,
    ITimeBlockUpdatePayload,
    dayIdTypes
} from '../../@types/TimeBlockInterfaces'
import {
    ITimetableFormCacheUpdatePayload,
    ITimetableInitPayload,
    ITimetableNotifyUpdatePayload,
    ITimetableSubjectsUpdatePayload,
    ITimetableToggleNotifyPayload,
    IUpdateDaysPayload
} from '../../@types/TimetableInterfaces'
import { timetableIS } from '../initialStates'

const timetableSlice = createSlice({
    name: 'timetable',
    initialState: timetableIS,
    reducers: {
        timetableInitialize(state, action: ITimetableInitPayload) {
            const { blocks, settings } = action.payload
            state.blocks = blocks
            state.settings = settings
        },
        blockAdded(state, action: ITimeBlockAddPayload) {
            const block = action.payload
            const newBlock: ITimeBlock = {
                id: nanoid(),
                ...block
            }
            state.blocks[block.day].push(newBlock)
            // Closing the form
            state.statuses.isBlockFormVisible = false
        },
        blockDeleted(state, action: ITimeBlockDeletePayload) {
            const { day, id } = action.payload
            state.blocks[day] = state.blocks[day].filter((block) => block.id !== id)
            // CLosing the form
            state.statuses.isBlockFormVisible = false
            state.statuses.selectedBlock = null
        },
        blockUpdated(state, action: ITimeBlockUpdatePayload) {
            const id = action.payload.oldBlock.id
            const { oldBlock, newBlock } = action.payload
            // Deleting old block
            state.blocks[oldBlock.day] = state.blocks[oldBlock.day].filter((block) => block.id !== id)
            // Adding new block
            state.blocks[newBlock.day].push(newBlock)
            // Closing the form
            state.statuses.isBlockFormVisible = false
            state.statuses.selectedBlock = null
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
            if (type === 'start') {
                state.settings.notifyStart = !state.settings.notifyStart
            } else if (type === 'end') {
                state.settings.notifyEnd = !state.settings.notifyEnd
            }
        },
        updateTTNotifyBefore(state, action: ITimetableNotifyUpdatePayload) {
            const { type, value } = action.payload
            if (type === 'start') {
                state.settings.notifyStartBefore = value
            } else if (type === 'end') {
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
    updateTTSubjects
} = timetableSlice.actions

export const selectAllBlocks = (state: IState) => state.timetable.blocks
export const selectIsBlockFormVisible = (state: IState) => state.timetable.statuses.isBlockFormVisible
export const selectSelectedBlock = (state: IState) => state.timetable.statuses.selectedBlock
export const selectBlocksByDayId = (state: IState, dayId: dayIdTypes) => state.timetable.blocks[dayId]
export const selectDaysToShow = (state: IState) => state.timetable.settings.daysToShow
export const selectTimetableSettings = (state: IState) => state.timetable.settings
export const selectDuplicateBlock = (state: IState) => state.timetable.statuses.blockToBeDuplicated
export const selectBlockByCurrentDay = (state: IState) =>
    state.timetable.blocks[new Date().getDay() as dayIdTypes] as ITimeBlock[]
export const selectFormCache = (state: IState) => state.timetable.formCache
