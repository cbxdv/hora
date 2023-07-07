import { ITimeBlock, ITimeBlockBase } from '@appTypes/TimeBlockInterfaces'

import { blockAdded, blockDeleted, blockUpdated, hideBlockForm } from '@redux/slices/timetableSlice'
import { AppDispatch } from '@redux/store'

import { hours12To24 } from '@utils/timeUtils'

import { IBlockFormState } from './reducer'

export const checkIsInvalid = (state: IBlockFormState) => {
    const { title, startAmPm, endAmPm, startHours, startMinutes, endHours, endMinutes } = state
    if (title.length === 0) {
        return true
    }
    if (startAmPm === `pm` && endAmPm === `am`) {
        return true
    }
    if (startHours > endHours) {
        if (startAmPm === `pm` && endAmPm === `am`) {
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
        day: state.day,
        color: state.color,
        description: state.description.trim(),
        startTime: {
            hours: hours12To24(state.startHours, state.startAmPm),
            minutes: state.startMinutes
        },
        endTime: {
            hours: hours12To24(state.endHours, state.endAmPm),
            minutes: state.endMinutes
        }
    }
    appDispatch(blockAdded(newBlock))
}

export const editHandler = (state: IBlockFormState, oldBlock: ITimeBlock | null, appDispatch: AppDispatch) => {
    if (state.title.length === 0) {
        return
    }
    if (oldBlock == null) {
        return
    }
    const newBlock = {
        ...oldBlock,
        title: state.title.trim(),
        day: state.day,
        color: state.color,
        description: state.description.trim(),
        startTime: {
            hours: hours12To24(state.startHours, state.startAmPm),
            minutes: state.startMinutes
        },
        endTime: {
            hours: hours12To24(state.endHours, state.endAmPm),
            minutes: state.endMinutes
        }
    }
    const data = { oldBlock, newBlock }
    appDispatch(blockUpdated(data))
}

export const dangerButtonHandler = (oldBlock: ITimeBlock | null, appDispatch: AppDispatch) => {
    if (oldBlock) {
        appDispatch(blockDeleted({ day: oldBlock.day, id: oldBlock.id }))
    } else {
        appDispatch(hideBlockForm())
    }
}
