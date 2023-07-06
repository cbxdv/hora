import { PayloadAction } from '@reduxjs/toolkit'
import { ITime, IBlocks, DayID } from './TimeBlockInterfaces'

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

export type timetableNotifyTypes = 'start' | 'end'

export type ITimetableToggleNotifyPayload = PayloadAction<timetableNotifyTypes>

export type ITimetableNotifyUpdatePayload = PayloadAction<{
    type: timetableNotifyTypes
    value: number
}>

export type ITimetableFormCacheUpdatePayload = PayloadAction<ITimetableFormCache>

export type ITimetableSubjectsUpdatePayload = PayloadAction<ITimetableSubject[]>
