import { PayloadAction } from '@reduxjs/toolkit'

import { ITime, IBlocks, DayID, ITimeBlock } from './TimeBlockInterfaces'

export type IUpdateDaysPayload = PayloadAction<DayID>

export interface ITimetableSettings {
    daysToShow: {
        [key in DayID]: boolean
    }
    notifyStart: boolean
    notifyStartBefore: number
    notifyEnd: boolean
    notifyEndBefore: number
}

export type ITimetableDiskData = {
    blocks: IBlocks
    settings: ITimetableSettings
    allocations: ITTAllocations
}

export interface ITimetableSubject {
    title: string
    color: string
    description: string
}

export type ITimetableFormCache = {
    startTime: ITime | null
    endTime: ITime | null
    day: DayID | null
    subjects: ITimetableSubject[]
}

export type ITimetableInitPayload = PayloadAction<ITimetableDiskData>

export type timetableNotifyTypes = `start` | `end`

export type ITimetableToggleNotifyPayload = PayloadAction<timetableNotifyTypes>

export type ITimetableNotifyUpdatePayload = PayloadAction<{
    type: timetableNotifyTypes
    value: number
}>

export type ITimetableFormCacheUpdatePayload = PayloadAction<ITimetableFormCache>

export type ITimetableSubjectsUpdatePayload = PayloadAction<ITimetableSubject[]>

export type ITTFormCacheDayUpdatePayload = PayloadAction<DayID>

export type ITTCanceledBlocks = string[]

export type ITTDaySubs = {
    [key in DayID]: {
        subWith: DayID | null
        blocks: ITimeBlock[]
        canceled: ITTCanceledBlocks
    }
}

export interface ITTAllocations {
    daySubs: ITTDaySubs
    canceledBlocks: ITTCanceledBlocks
}

export type ITTDayToSubUpdatePayload = PayloadAction<DayID>

export type ITTDaySubAddPayload = PayloadAction<{
    subTo: DayID
    subWith: DayID
}>

export type ITTDaySubDeletePayload = PayloadAction<DayID>

export type ITTBlockCancellationPayload = PayloadAction<{
    blockId: string
    subDay: DayID | null
}>
