import { PayloadAction } from '@reduxjs/toolkit'
import { IBlockTime, IBlocks, dayIdTypes } from './TimeBlockInterfaces'

export type IUpdateDaysPayload = PayloadAction<dayIdTypes>

export interface ITimetableSettings {
    daysToShow: {
        [key in dayIdTypes]: boolean
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
    startTime: IBlockTime | null
    endTime: IBlockTime | null
    day: dayIdTypes | null
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
