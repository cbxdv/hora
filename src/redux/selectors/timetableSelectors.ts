import { IState } from '@appTypes/StateInterfaces'
import { DayID } from '@appTypes/TimeBlockInterfaces'
import { filterNonCanceledBlocks } from '@utils/timetableUtils'

export const selectTTAllBlocks = (state: IState) => state.timetable.blocks

export const selectIsTTBlockFormVisible = (state: IState) => state.timetable.statuses.isBlockFormVisible

export const selectTTSelBlock = (state: IState) => state.timetable.statuses.selectedBlock

export const selectTTBlocksByDay = (state: IState, day: DayID) => state.timetable.blocks[day]

export const selectTTDaysToShow = (state: IState) => state.timetable.settings.daysToShow

export const selectTTSettings = (state: IState) => state.timetable.settings

export const selectTTDupBlock = (state: IState) => state.timetable.statuses.blockToBeDuplicated

export const selectTTShowCurentTime = (state: IState) => state.timetable.settings.showCurrentTimeInHeader

export const selectTTShowCurrentBlock = (state: IState) => state.timetable.settings.showCurrentBlockInHeader

export const selectTTHeaderBlock = (state: IState) => state.timetable.statuses.headerBlock

export const selectTTFormCache = (state: IState) => state.timetable.formCache

export const selectTTFormCacheDuration = (state: IState) => state.timetable.formCache.duration

export const selectTTDayToBeOpenSubForm = (state: IState) => state.timetable.statuses.dayToBeOpenSubForm

export const selectTTSubDayToOpenBlockForm = (state: IState) => state.timetable.statuses.subDayToOpenBlockForm

export const selectIsTTSubFormVisible = (state: IState) => state.timetable.statuses.isSubFormVisible

export const selectTTAllocations = (state: IState) => state.timetable.allocations

export const selectTTDayToSub = (state: IState, day: DayID) => state.timetable.allocations.subDays[day]

export const selectTTCanceledBlocks = (state: IState) => state.timetable.allocations.canceledBlocks

export const selectTTSubDayCancels = (state: IState, day: DayID) => state.timetable.allocations.subDays[day].canceled

export const selectTTCurrentValidBlocksWithSub = (state: IState) => {
    const currentDay = new Date().getDay() as DayID
    const dayToBeSubbed = state.timetable.allocations.subDays[currentDay].subWith
    let blocks = []
    let canceled = []
    if (dayToBeSubbed != null) {
        blocks = state.timetable.allocations.subDays[currentDay].blocks
        canceled = state.timetable.allocations.subDays[currentDay].canceled
    } else {
        blocks = state.timetable.blocks[currentDay]
        canceled = state.timetable.allocations.canceledBlocks
    }
    return filterNonCanceledBlocks(blocks, canceled)
}
