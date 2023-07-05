import { PayloadAction } from '@reduxjs/toolkit'

export interface IBlockTime {
    hours: number
    minutes: number
    seconds?: number
}

export type dayIdTypes = 1 | 2 | 3 | 4 | 5 | 6 | 0

export interface ITimeBlockBase {
    title: string
    startTime: IBlockTime
    endTime: IBlockTime
    color: string
    description: string
    day: dayIdTypes
}

export interface ITimeBlock extends ITimeBlockBase {
    readonly id: string
}

export type IBlocks = {
    [key in dayIdTypes]: ITimeBlock[]
}

export type ITimeBlockPayload = PayloadAction<ITimeBlock>

export type ITimeBlockAddPayload = PayloadAction<ITimeBlockBase>

export type ITimeBlockDeletePayload = PayloadAction<{
    day: dayIdTypes
    readonly id: string
}>

export type ITimeBlockUpdatePayload = PayloadAction<{
    oldBlock: ITimeBlock
    newBlock: ITimeBlock
}>
