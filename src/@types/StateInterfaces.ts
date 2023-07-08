import { IAppSettings, themeTypes } from '@appTypes/AppInterfaces'
import { INotifyObject } from '@appTypes/ServiceInterfaces'
import { DayID, IBlocks, ITimeBlock } from '@appTypes/TimeBlockInterfaces'
import { ITTAllocations, ITimetableFormCache, ITimetableSettings } from '@appTypes/TimetableInterfaces'

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
        isSubFormVisible: boolean
        selectedBlock: ITimeBlock | null
        blockToBeDuplicated: ITimeBlock | null
        dayToBeOpenSubForm: DayID | null
        subDayToOpenBlockForm: DayID | null
    }
    formCache: ITimetableFormCache
    allocations: ITTAllocations
}

export interface IState {
    app: IAppState
    service: IServiceState
    timetable: ITimetableState
}
