import { IAppSettings } from '@appTypes/AppInterfaces'
import { ITTDiskData } from '@appTypes/TimetableInterfaces'
import { AppIS, TimetableIS } from '@redux/initialStates'

import { normalizeObject, transferToFrom } from './objectUtils'

const timetableData: ITTDiskData = {
    blocks: TimetableIS.blocks,
    settings: TimetableIS.settings,
    allocations: TimetableIS.allocations
}

const appData: IAppSettings = AppIS.settings

type normTTDataType = (data: any) => ITTDiskData
export const normalizeTimetableData: normTTDataType = data => {
    const normalizedData = normalizeObject(data)
    const transferredData: ITTDiskData = transferToFrom(timetableData, normalizedData)
    return transferredData
}

type normAppDataType = (data: any) => IAppSettings
export const normalizeAppData: normAppDataType = data => {
    const normalizedData = normalizeObject(data)
    const transferredData: IAppSettings = transferToFrom(appData, normalizedData)
    return transferredData
}
