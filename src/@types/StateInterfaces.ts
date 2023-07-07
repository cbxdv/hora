import { IAppSettings, themeTypes } from '@appTypes/AppInterfaces'
import { INotifyObject } from '@appTypes/ServiceInterfaces'
import { IBlocks, ITimeBlock } from '@appTypes/TimeBlockInterfaces'
import { ITimetableFormCache, ITimetableSettings } from '@appTypes/TimetableInterfaces'

export interface IAppState {
    statuses: {
        isLoading: boolean
        isSettingsVisible: boolean
        showingTheme: themeTypes
        osTheme: themeTypes
    }
    settings: IAppSettings
    appInfo: {
        version: string
    }
}

export interface IServiceState {
    serviceData: {
        notifications: INotifyObject[]
    }
}

export interface ITimetableState {
    blocks: IBlocks
    settings: ITimetableSettings
    statuses: {
        isBlockFormVisible: boolean
        selectedBlock: ITimeBlock | null
        blockToBeDuplicated: ITimeBlock | null
    }
    formCache: ITimetableFormCache
}

export interface IState {
    app: IAppState
    service: IServiceState
    timetable: ITimetableState
}
