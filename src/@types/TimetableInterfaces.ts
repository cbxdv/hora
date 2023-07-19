import { ITime, IBlocks, DayID, ITimeBlock } from './TimeBlockInterfaces'

export interface ITTSettings extends ITTNotifyPropType {
    daysToShow: {
        [key in DayID]: boolean
    }
    showCurrentTimeInHeader: boolean
    showCurrentBlockInHeader: boolean
}

export interface ITTNotifyPropType {
    notifyStart: boolean
    notifyStartBefore: number
    notifyEnd: boolean
    notifyEndBefore: number
}

export type ITTDiskData = {
    blocks: IBlocks
    settings: ITTSettings
    allocations: ITTAllocations
}

export interface ITTSubject {
    title: string
    color: string
    description: string
    additionals: { [key: string]: string }
}

export type ITTFormCache = {
    startTime: ITime | null
    endTime: ITime | null
    duration: number
    day: DayID | null
    subjects: ITTSubject[]
}

export enum TTNotifyType {
    Start = `start`,
    End = `end`
}

export type ITTCanceledBlocks = string[]

export type ITTSubDays = {
    [key in DayID]: {
        subWith: DayID | null
        blocks: ITimeBlock[]
        canceled: ITTCanceledBlocks
    }
}

export interface ITTAllocations {
    subDays: ITTSubDays
    canceledBlocks: ITTCanceledBlocks
}
