import { IAppSettings, themeTypes } from './AppInterfaces'
import { INotifyObject } from './ServiceInterfaces'
import { IBlocks, ITimeBlock } from './TimeBlockInterfaces'
import { ITimetableFormCache, ITimetableSettings } from './TimetableInterfaces'

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
