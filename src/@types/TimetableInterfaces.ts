import { PayloadAction } from '@reduxjs/toolkit'
import { IBlocks, dayIdTypes } from './TimeBlockInterfaces'

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

export type ITimetableInitPayload = PayloadAction<ITimetableDiskData>

export type timetableNotifyTypes = 'start' | 'end'

export type ITimetableToggleNotifyPayload = PayloadAction<timetableNotifyTypes>

export type ITimetableNotifyUpdatePayload = PayloadAction<{
    type: timetableNotifyTypes
    value: number
}>
