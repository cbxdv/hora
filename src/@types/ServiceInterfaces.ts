import { PayloadAction } from '@reduxjs/toolkit'

import { ITime } from './TimeBlockInterfaces'

export type IServiceDataPayload = PayloadAction<INotifyObject[]>

export interface INotifyObject {
    readonly id: string
    title: string
    body: string
    time: ITime
}

export type notifyPropertiesType = {
    notifyStart: boolean
    notifyStartBefore: number
    notifyEnd: boolean
    notifyEndBefore: number
}
