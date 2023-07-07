import { IAppState, IServiceState, ITimetableState } from '@appTypes/StateInterfaces'

export const appIS: IAppState = {
    statuses: {
        isLoading: true,
        isSettingsVisible: false,
        showingTheme: `dark`,
        osTheme: `dark`
    },
    settings: {
        theme: `system`,
        notifications: true,
        minimizeOnClose: true,
        openAtStartup: false,
        openMinimized: false
    },
    appInfo: {
        version: `2.0.0`
    }
}

export const serviceIS: IServiceState = {
    serviceData: {
        notifications: []
    }
}

export const timetableIS: ITimetableState = {
    blocks: {
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
        0: []
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
        notifyEndBefore: 5
    },
    statuses: {
        isBlockFormVisible: false,
        selectedBlock: null,
        blockToBeDuplicated: null
    },
    formCache: {
        startTime: null,
        endTime: null,
        day: null,
        subjects: []
    }
}
