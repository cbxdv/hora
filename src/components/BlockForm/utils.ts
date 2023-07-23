import { ITimeBlock, ITimeBlockBase, TimeM } from '@appTypes/TimeBlockInterfaces'

import { ttBlockAdded, ttBlockDeleted, ttBlockFormClosed, ttBlockUpdated } from '@redux/slices/timetableSlice'
import { AppDispatch } from '@redux/store'

import { hours12To24 } from '@utils/timeUtils'

import { IBlockFormState } from './reducer'

export const checkIsInvalid = (state: IBlockFormState) => {
    const { title, startAmPm, endAmPm, startHours, startMinutes, endHours, endMinutes } = state
    if (title.length === 0) {
        return true
    }
    if (startAmPm === TimeM.PM && endAmPm === TimeM.AM) {
        return true
    }
    if (startHours > endHours) {
        if (startAmPm === TimeM.PM && endAmPm === TimeM.AM) {
            return true
        }
    }
    if (startHours === endHours && endMinutes - startMinutes < 15) {
        return true
    }
    return false
}

export const createHandler = (state: IBlockFormState, appDispatch: AppDispatch) => {
    if (checkIsInvalid(state)) {
        return
    }
    const newBlock: ITimeBlockBase = {
        title: state.title.trim(),
        color: state.color,
        description: state.description.trim(),
        startTime: {
            hours: hours12To24(state.startHours, state.startAmPm),
            minutes: state.startMinutes,
            seconds: 0,
            day: state.day
        },
        endTime: {
            hours: hours12To24(state.endHours, state.endAmPm),
            minutes: state.endMinutes,
            seconds: 0,
            day: state.day
        }
    }
    if (state.additionals.length !== 0) {
        newBlock.additionals = state.additionals
    }
    appDispatch(
        ttBlockAdded({
            block: newBlock,
            isSubDay: state.isSubDay
        })
    )
}

export const editHandler = (state: IBlockFormState, oldBlock: ITimeBlock | null, appDispatch: AppDispatch) => {
    if (checkIsInvalid(state)) {
        return
    }
    if (oldBlock == null) {
        return
    }
    const newBlock = {
        ...oldBlock,
        title: state.title.trim(),
        color: state.color,
        description: state.description.trim(),
        startTime: {
            hours: hours12To24(state.startHours, state.startAmPm),
            minutes: state.startMinutes,
            seconds: 0,
            day: state.day
        },
        endTime: {
            hours: hours12To24(state.endHours, state.endAmPm),
            minutes: state.endMinutes,
            seconds: 0,
            day: state.day
        }
    }
    if (state.additionals.length !== 0) {
        newBlock.additionals = state.additionals
    } else {
        delete newBlock.additionals
    }
    appDispatch(ttBlockUpdated({ oldBlock, newBlock, isSubDay: state.isSubDay }))
}

export const dangerButtonHandler = async (
    state: IBlockFormState,
    oldBlock: ITimeBlock | null,
    appDispatch: AppDispatch,
    confirm: ((data: any) => Promise<boolean>) | null
) => {
    if (oldBlock) {
        if (confirm == null) {
            return
        }
        const response = await confirm({
            title: `Delete`,
            description: `Delete this block (${state.title}) ?`,
            acceptText: `Delete`,
            rejectText: `Nope`
        })
        if (response) {
            appDispatch(ttBlockDeleted({ day: oldBlock.startTime.day, id: oldBlock.id, isSubDay: state.isSubDay }))
        }
    } else {
        appDispatch(ttBlockFormClosed())
    }
}
