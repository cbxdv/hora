import { IAppSettings, Themes } from '@appTypes/AppInterfaces'
import { INotifyObject } from '@appTypes/ServiceInterfaces'
import { DayID, IBlocks, ITimeBlock } from '@appTypes/TimeBlockInterfaces'
import { ITTAllocations, ITTFormCache, ITTSettings } from '@appTypes/TimetableInterfaces'

export interface IAppState {
    statuses: {
        isLoading: boolean
        isSettingsVisible: boolean
        showingTheme: Themes
        osTheme: Themes
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
    settings: ITTSettings
    statuses: {
        isBlockFormVisible: boolean
        isSubFormVisible: boolean
        selectedBlock: ITimeBlock | null
        blockToBeDuplicated: ITimeBlock | null
        dayToBeOpenSubForm: DayID | null
        subDayToOpenBlockForm: DayID | null
        headerBlock: ITimeBlock | null
    }
    formCache: ITTFormCache
    allocations: ITTAllocations
}

export interface IState {
    app: IAppState
    service: IServiceState
    timetable: ITimetableState
}
