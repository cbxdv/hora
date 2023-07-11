import { PayloadAction } from '@reduxjs/toolkit'

import { DayID, ITime, ITimeBlock, ITimeBlockBase } from './TimeBlockInterfaces'
import { ITTSubject, ITTDiskData, ITTFormCache, TTNotifyType } from './TimetableInterfaces'

export type TTInitPayload = PayloadAction<ITTDiskData>

export type TTBlockAddedPayload = PayloadAction<{
    block: ITimeBlockBase
    isSubDay: boolean
}>

export type TTBlockDeletedPayload = PayloadAction<{
    day: DayID
    readonly id: string
    isSubDay: boolean
}>

export type TTBlockUpdatedPayload = PayloadAction<{
    oldBlock: ITimeBlock
    newBlock: ITimeBlock
    isSubDay: boolean
}>

export type TTDayIdPayload = PayloadAction<DayID>

export type TTFormCacheTimeUpdated = PayloadAction<{
    startTime: ITime | null
    endTime: ITime | null
}>

export type TTNotifyToggledPayload = PayloadAction<TTNotifyType>

export type TTNotifyUpdatedPayload = PayloadAction<{
    type: TTNotifyType
    value: number
}>

export type TTFormCacheUpdatedPayload = PayloadAction<ITTFormCache>

export type TTSubjectsUpdatedPayload = PayloadAction<ITTSubject[]>

export type TTSubDayAddedPayload = PayloadAction<{
    subTo: DayID
    subWith: DayID
}>

export type TTCancellationPayload = PayloadAction<{
    blockId: string
    subDay: DayID | null
}>
