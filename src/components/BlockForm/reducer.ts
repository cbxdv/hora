import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ITimetableFormCache, ITimetableSubject } from '../../@types/TimetableInterfaces'
import { ITimeBlock, DayID } from '../../@types/TimeBlockInterfaces'
import { ValueDropdownItemType } from '../ValueDropdown'
import { getAmPm, hours24To12 } from '../../utilities/timeUtils'

export interface IBlockFormState {
    title: string
    day: DayID
    color: string
    description: string
    startHours: number
    startMinutes: number
    startAmPm: 'am' | 'pm'
    endHours: number
    endMinutes: number
    endAmPm: 'am' | 'pm'
    isSubjectDDVisible: boolean
    isDayDDVisible: boolean
    isColorDDVisible: boolean
    isStartTimeDDVisible: boolean
    isEndTimeDDVisible: boolean
    filteredSubjects: ValueDropdownItemType[]
    selectedSubjectIndex: number | null
}

export const blockFormIS: IBlockFormState = {
    title: '',
    day: 1,
    color: '#FFADAD',
    description: '',
    startHours: 8,
    startMinutes: 0,
    startAmPm: 'am',
    endHours: 9,
    endMinutes: 0,
    endAmPm: 'am',
    isSubjectDDVisible: false,
    isDayDDVisible: false,
    isColorDDVisible: false,
    isStartTimeDDVisible: false,
    isEndTimeDDVisible: false,
    filteredSubjects: [],
    selectedSubjectIndex: null
}

type createBlockFormProps = (data: {
    oldBlock: ITimeBlock | null
    duplicateBlock: ITimeBlock | null
    formCache: ITimetableFormCache | null
}) => IBlockFormState
export const createBlockFormIS: createBlockFormProps = ({ oldBlock, duplicateBlock, formCache }) => {
    let title = blockFormIS.title
    let day = blockFormIS.day
    let color = blockFormIS.color
    let description = blockFormIS.description
    let startHours = blockFormIS.startHours
    let startMinutes = blockFormIS.startMinutes
    let startAmPm = blockFormIS.startAmPm
    let endHours = blockFormIS.endHours
    let endMinutes = blockFormIS.endMinutes
    let endAmPm = blockFormIS.endAmPm
    let filteredSubjects = blockFormIS.filteredSubjects

    const blockToUse = oldBlock || duplicateBlock
    if (blockToUse) {
        title = blockToUse.title
        day = blockToUse.day
        color = blockToUse.color
        description = blockToUse.description
        startHours = hours24To12(blockToUse.startTime.hours)
        startMinutes = blockToUse.startTime.minutes
        startAmPm = getAmPm(blockToUse.startTime.hours)
        endHours = hours24To12(blockToUse.endTime.hours)
        endMinutes = blockToUse.endTime.minutes
        endAmPm = getAmPm(blockToUse.endTime.hours)
    } else {
        if (formCache?.day) day = formCache.day
        if (formCache?.startTime) {
            startHours = hours24To12(formCache.startTime.hours)
            startMinutes = formCache.startTime.minutes
            startAmPm = getAmPm(formCache.startTime.hours)
        }
        if (formCache?.endTime) {
            endHours = hours24To12(formCache.endTime.hours)
            endMinutes = formCache.endTime.minutes
            endAmPm = getAmPm(formCache.endTime.hours)
        }
    }
    if (formCache?.subjects) {
        filteredSubjects = formCache.subjects.map((subject, index) => {
            return {
                name: subject.title,
                value: index
            }
        })
    }
    return {
        ...blockFormIS,
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
        filteredSubjects
    }
}

const blockFormSlice = createSlice({
    name: 'blockForm',
    initialState: blockFormIS,
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
        },
        setStartMinutes(state, action: PayloadAction<number>) {
            state.startMinutes = action.payload
        },
        setStartAmPm(state, action: PayloadAction<'am' | 'pm'>) {
            state.startAmPm = action.payload
        },
        setEndHours(state, action: PayloadAction<number>) {
            state.endHours = action.payload
        },
        setEndMinutes(state, action: PayloadAction<number>) {
            state.endMinutes = action.payload
        },
        setEndAmPm(state, action: PayloadAction<'am' | 'pm'>) {
            state.endAmPm = action.payload
        },
        setFilteredSub(state, action: PayloadAction<ValueDropdownItemType[]>) {
            state.filteredSubjects = action.payload
        },
        setSelSubIndex(state, action: PayloadAction<number | null>) {
            state.selectedSubjectIndex = action.payload
        },
        showSubjectDD(state) {
            state.isSubjectDDVisible = true
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
        substituteSubject(state, action: PayloadAction<{ index: number; subject: ITimetableSubject }>) {
            const { index, subject } = action.payload
            state.selectedSubjectIndex = index
            state.title = subject.title
            state.color = subject.color
            state.description = subject.description
        }
    }
})

export default blockFormSlice.reducer

export const blockFormActions = blockFormSlice.actions
