import { PayloadAction } from '@reduxjs/toolkit'

export interface ITime {
    hours: number
    minutes: number
    seconds: number
    day: DayID
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
    additionals?: {
        id: string
        name: string
        value: string
    }[]
}

export interface ITimeBlock extends ITimeBlockBase {
    readonly id: string
}

export type IBlocks = {
    [key in DayID]: ITimeBlock[]
}

export enum TimeM {
    AM = `am`,
    PM = `pm`
}

export type TimeBlockPayload = PayloadAction<ITimeBlock>

export type TimeBlockNullPayload = PayloadAction<ITimeBlock | null>
