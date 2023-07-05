import { IAppSettings, themeTypes } from './AppInterfaces'
import { INotifObject } from './ServiceInterfaces'
import { IBlocks, ITimeBlock } from './TimeBlockInterfaces'
import { ITimetableSettings } from './TimetableInterfaces'

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
        notifications: INotifObject[]
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
}

export interface IState {
    app: IAppState
    service: IServiceState
    timetable: ITimetableState
}
