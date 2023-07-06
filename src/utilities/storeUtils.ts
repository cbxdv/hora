import { appIS, timetableIS } from '../redux/initialStates'
import { IAppSettings } from '../@types/AppInterfaces'
import { ITimetableDiskData } from '../@types/TimetableInterfaces'
import { normalizeObject, transferToFrom } from './objectUtils'

const timetableData: ITimetableDiskData = {
    blocks: timetableIS.blocks,
    settings: timetableIS.settings
}

const appData: IAppSettings = appIS.settings

type normTTDataType = (data: any) => ITimetableDiskData
export const normalizeTimetableData: normTTDataType = (data) => {
    const normalizedData = normalizeObject(data)
    const transferredData: ITimetableDiskData = transferToFrom(timetableData, normalizedData)
    return transferredData
}

type normAppDataType = (data: any) => IAppSettings
export const normalizeAppData: normAppDataType = (data) => {
    const normalizedData = normalizeObject(data)
    const transferredData: IAppSettings = transferToFrom(appData, normalizedData)
    return transferredData
}
