import { AppThemes, Themes } from '@appTypes/AppInterfaces'
import { IAppState, IServiceState, ITimetableState } from '@appTypes/StateInterfaces'

export const AppIS: IAppState = {
    statuses: {
        isLoading: true,
        isSettingsVisible: false,
        isAppSidebarVisible: true,
        showingTheme: Themes.Dark,
        osTheme: Themes.Dark
    },
    toasts: [],
    settings: {
        theme: AppThemes.System,
        notifications: true,
        minimizeOnClose: true,
        openAtStartup: false,
        openMinimized: false
    },
    appInfo: {
        version: `2.0.0`
    }
}

export const ServiceIS: IServiceState = {
    serviceData: {
        notifications: []
    }
}

export const TimetableIS: ITimetableState = {
    blocks: {
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: []
    },
    settings: {
        daysToShow: {
            0: true,
            1: true,
            2: true,
            3: true,
            4: true,
            5: true,
            6: true
        },
        notifyStart: true,
        notifyStartBefore: 5,
        notifyEnd: true,
        notifyEndBefore: 5,
        showCurrentTimeInHeader: true,
        showCurrentBlockInHeader: true
    },
    statuses: {
        isBlockFormVisible: false,
        isSubFormVisible: false,
        selectedBlock: null,
        blockToBeDuplicated: null,
        dayToBeOpenSubForm: null,
        subDayToOpenBlockForm: null,
        headerBlock: null
    },
    formCache: {
        startTime: null,
        endTime: null,
        duration: 60,
        day: null,
        subjects: []
    },
    allocations: {
        subDays: {
            0: {
                subWith: null,
                blocks: [],
                canceled: []
            },
            1: {
                subWith: null,
                blocks: [],
                canceled: []
            },
            2: {
                subWith: null,
                blocks: [],
                canceled: []
            },
            3: {
                subWith: null,
                blocks: [],
                canceled: []
            },
            4: {
                subWith: null,
                blocks: [],
                canceled: []
            },
            5: {
                subWith: null,
                blocks: [],
                canceled: []
            },
            6: {
                subWith: null,
                blocks: [],
                canceled: []
            }
        },
        canceledBlocks: []
    }
}
