import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'

import { DayID, ITime, ITimeBlock, TimeM } from '@appTypes/TimeBlockInterfaces'
import { ITTFormCache, ITTSubject } from '@appTypes/TimetableInterfaces'

import { ValueDropdownItemType } from '@components/ValueDropdown'

import { addDurationToTimeLimited, getAmPm, hours12To24, hours24To12 } from '@utils/timeUtils'

export interface IBlockFormAdditional {
    id: string
    name: string
    value: string
}

export interface IBlockFormState {
    // Form attributes
    title: string
    day: DayID
    color: string
    description: string
    startHours: number
    startMinutes: number
    startAmPm: TimeM
    endHours: number
    endMinutes: number
    endAmPm: TimeM
    additionals: IBlockFormAdditional[]

    // Dropdown visibilities
    isSubjectDDVisible: boolean
    isDayDDVisible: boolean
    isColorDDVisible: boolean
    isStartTimeDDVisible: boolean
    isEndTimeDDVisible: boolean

    // Subjects for dropdown
    filteredSubjects: ValueDropdownItemType[]
    selectedSubjectIndex: number | null

    // Statuses & cache
    isSubDay: boolean
    cacheDuration: number
}

export const BlockFormIS: IBlockFormState = {
    title: ``,
    day: 1,
    color: `#FFADAD`,
    description: ``,
    startHours: 8,
    startMinutes: 0,
    startAmPm: TimeM.AM,
    endHours: 9,
    endMinutes: 0,
    endAmPm: TimeM.AM,
    additionals: [],
    isSubjectDDVisible: false,
    isDayDDVisible: false,
    isColorDDVisible: false,
    isStartTimeDDVisible: false,
    isEndTimeDDVisible: false,
    filteredSubjects: [],
    selectedSubjectIndex: null,
    isSubDay: false,
    cacheDuration: 60
}

type createBlockFormProps = (data: {
    oldBlock: ITimeBlock | null
    duplicateBlock: ITimeBlock | null
    formCache: ITTFormCache | null
    subDay: DayID | null
}) => IBlockFormState
export const createBlockFormIS: createBlockFormProps = ({ oldBlock, duplicateBlock, formCache, subDay }) => {
    let title = BlockFormIS.title
    let day = BlockFormIS.day
    let color = BlockFormIS.color
    let description = BlockFormIS.description
    let startHours = BlockFormIS.startHours
    let startMinutes = BlockFormIS.startMinutes
    let startAmPm = BlockFormIS.startAmPm
    let endHours = BlockFormIS.endHours
    let endMinutes = BlockFormIS.endMinutes
    let endAmPm = BlockFormIS.endAmPm
    let filteredSubjects = BlockFormIS.filteredSubjects
    let cacheDuration = BlockFormIS.cacheDuration
    let additionals = BlockFormIS.additionals

    const blockToUse = oldBlock || duplicateBlock
    if (blockToUse) {
        title = blockToUse.title
        day = blockToUse.startTime.day
        color = blockToUse.color
        description = blockToUse.description
        startHours = hours24To12(blockToUse.startTime.hours)
        startMinutes = blockToUse.startTime.minutes
        startAmPm = getAmPm(blockToUse.startTime.hours)
        endHours = hours24To12(blockToUse.endTime.hours)
        endMinutes = blockToUse.endTime.minutes
        endAmPm = getAmPm(blockToUse.endTime.hours)
        additionals = blockToUse.additionals || []
    } else if (formCache != null) {
        if (formCache.day != null) {
            day = formCache.day
        }
        if (formCache.startTime != null) {
            startHours = hours24To12(formCache.startTime.hours)
            startMinutes = formCache.startTime.minutes
            startAmPm = getAmPm(formCache.startTime.hours)
        }
        if (formCache.endTime != null) {
            endHours = hours24To12(formCache.endTime.hours)
            endMinutes = formCache.endTime.minutes
            endAmPm = getAmPm(formCache.endTime.hours)
        }
        if (formCache.duration != null) {
            cacheDuration = formCache.duration
        }
    }
    if (formCache?.subjects != null) {
        filteredSubjects = formCache.subjects.map((subject, index) => {
            return {
                name: subject.title,
                value: index
            }
        })
    }
    if (subDay != null) {
        day = subDay
    }
    return {
        ...BlockFormIS,
        title,
        day,
        color,
        description,
        startHours,
        startMinutes,
        startAmPm,
        endHours,
        endMinutes,
        endAmPm,
        additionals,
        filteredSubjects,
        isEditing: oldBlock != null,
        isSubDay: subDay != null,
        cacheDuration
    }
}

const blockFormSlice = createSlice({
    name: `blockForm`,
    initialState: BlockFormIS,
    reducers: {
        setTitle(state, action: PayloadAction<string>) {
            state.title = action.payload
        },
        setDay(state, action: PayloadAction<DayID>) {
            state.day = action.payload
        },
        setColor(state, action: PayloadAction<string>) {
            state.color = action.payload
        },
        setDescription(state, action: PayloadAction<string>) {
            state.description = action.payload
        },
        setStartHours(state, action: PayloadAction<number>) {
            state.startHours = action.payload
            // Adding duration to the start time updated
            const start: ITime = {
                hours: hours12To24(state.startHours, state.startAmPm),
                minutes: state.startMinutes,
                seconds: 0,
                day: state.day
            }
            const addedTime = addDurationToTimeLimited(start, state.cacheDuration)
            state.endHours = hours24To12(addedTime.hours)
            state.endMinutes = addedTime.minutes
            state.endAmPm = getAmPm(addedTime.hours)
        },
        setStartMinutes(state, action: PayloadAction<number>) {
            state.startMinutes = action.payload
            // Adding duration to the start time updated
            const start: ITime = {
                hours: hours12To24(state.startHours, state.startAmPm),
                minutes: state.startMinutes,
                seconds: 0,
                day: state.day
            }
            const addedTime = addDurationToTimeLimited(start, state.cacheDuration)
            state.endHours = hours24To12(addedTime.hours)
            state.endMinutes = addedTime.minutes
            state.endAmPm = getAmPm(addedTime.hours)
        },
        setStartAmPm(state, action: PayloadAction<TimeM>) {
            state.startAmPm = action.payload
            // Adding duration to the start time updated
            const start: ITime = {
                hours: hours12To24(state.startHours, state.startAmPm),
                minutes: state.startMinutes,
                seconds: 0,
                day: state.day
            }
            const addedTime = addDurationToTimeLimited(start, state.cacheDuration)
            state.endHours = hours24To12(addedTime.hours)
            state.endMinutes = addedTime.minutes
            state.endAmPm = getAmPm(addedTime.hours)
        },
        setEndHours(state, action: PayloadAction<number>) {
            state.endHours = action.payload
        },
        setEndMinutes(state, action: PayloadAction<number>) {
            state.endMinutes = action.payload
        },
        setEndAmPm(state, action: PayloadAction<TimeM>) {
            state.endAmPm = action.payload
        },
        addNewAdditionals(state) {
            state.additionals.push({ id: nanoid(), name: ``, value: `` })
        },
        updateAdditional(state, action: PayloadAction<IBlockFormAdditional>) {
            const { id } = action.payload
            state.additionals = state.additionals.map(a => {
                if (a.id === id) {
                    return action.payload
                }
                return a
            })
        },
        deleteAdditional(state, action: PayloadAction<string>) {
            state.additionals = state.additionals.filter(a => a.id !== action.payload)
        },
        setFilteredSub(state, action: PayloadAction<ValueDropdownItemType[]>) {
            state.filteredSubjects = action.payload
        },
        setSelSubIndex(state, action: PayloadAction<number | null>) {
            state.selectedSubjectIndex = action.payload
        },
        showSubjectDD(state) {
            if (state.filteredSubjects.length !== 0) {
                state.isSubjectDDVisible = true
            }
        },
        hideSubjectDD(state) {
            state.isSubjectDDVisible = false
        },
        toggleSubjectDD(state) {
            state.isSubjectDDVisible = !state.isSubjectDDVisible
        },
        showDayDD(state) {
            state.isDayDDVisible = true
        },
        hideDayDD(state) {
            state.isDayDDVisible = false
        },
        toggleDayDD(state) {
            state.isDayDDVisible = !state.isDayDDVisible
        },
        showColorDD(state) {
            state.isColorDDVisible = true
        },
        hideColorDD(state) {
            state.isColorDDVisible = false
        },
        toggleColorDD(state) {
            state.isColorDDVisible = !state.isColorDDVisible
        },
        showStartDD(state) {
            state.isStartTimeDDVisible = true
        },
        hideStartDD(state) {
            state.isStartTimeDDVisible = false
        },
        toggleStartDD(state) {
            state.isStartTimeDDVisible = !state.isStartTimeDDVisible
        },
        showEndDD(state) {
            state.isEndTimeDDVisible = true
        },
        hideEndDD(state) {
            state.isEndTimeDDVisible = false
        },
        toggleEndDD(state) {
            state.isEndTimeDDVisible = !state.isEndTimeDDVisible
        },
        substituteSubject(state, action: PayloadAction<{ index: number; subject: ITTSubject }>) {
            const { index, subject } = action.payload
            state.selectedSubjectIndex = index
            state.title = subject.title
            state.color = subject.color
            state.description = subject.description
            state.additionals = subject.additionals
        }
    }
})

export default blockFormSlice.reducer

export const blockFormActions = blockFormSlice.actions
