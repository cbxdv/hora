import { PayloadAction } from '@reduxjs/toolkit'

export interface ITime {
    hours: number
    minutes: number
    seconds?: number
}

export enum DayID {
    Sunday = 0,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday
}

export interface ITimeBlockBase {
    title: string
    startTime: ITime
    endTime: ITime
    color: string
    description: string
    day: DayID
}

export interface ITimeBlock extends ITimeBlockBase {
    readonly id: string
}

export type IBlocks = {
    [key in DayID]: ITimeBlock[]
}

export type ITimeBlockPayload = PayloadAction<ITimeBlock>

export type ITimeBlockAddPayload = PayloadAction<{
    block: ITimeBlockBase
    isDaySub: boolean
}>

export type ITimeBlockDeletePayload = PayloadAction<{
    day: DayID
    readonly id: string
    daySub: DayID | null
}>

export type ITimeBlockUpdatePayload = PayloadAction<{
    oldBlock: ITimeBlock
    newBlock: ITimeBlock
    isDaySub: boolean
}>
