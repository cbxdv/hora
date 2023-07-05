import { PayloadAction } from '@reduxjs/toolkit'
import { IBlockTime } from './TimeBlockInterfaces'

export type IServiceDataPayload = PayloadAction<INotifObject[]>

export interface INotifObject {
    readonly id: string
    title: string
    body: string
    time: IBlockTime
}

export type notifyPropertiesType = {
    notifyStart: boolean
    notifyStartBefore: number
    notifyEnd: boolean
    notifyEndBefore: number
}
