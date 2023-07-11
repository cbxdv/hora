import { PayloadAction } from '@reduxjs/toolkit'

import { ITime } from './TimeBlockInterfaces'

export interface INotifyObject {
    readonly id: string
    title: string
    body: string
    time: ITime
}

export type ServiceDataPayload = PayloadAction<INotifyObject[]>
