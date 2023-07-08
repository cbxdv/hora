import { DayID, IBlocks, ITime, ITimeBlock, ITimeBlockBase } from '@appTypes/TimeBlockInterfaces'
import { ITTDaySubs, ITimetableFormCache, ITimetableSubject } from '@appTypes/TimetableInterfaces'
import { addDurationToTime, getDurationMinutes } from '@utils/timeUtils'

/**
 * A week of day IDs
 */
export const dayIds: DayID[] = [1, 2, 3, 4, 5, 6, 0]

/**
 * A list for dropdown of days in a week
 */
export const dayDropItems = [
    { name: `Monday`, value: 1 },
    { name: `Tuesday`, value: 2 },
    { name: `Wednesday`, value: 3 },
    { name: `Thursday`, value: 4 },
    { name: `Friday`, value: 5 },
    { name: `Saturday`, value: 6 },
    { name: `Sunday`, value: 0 }
]

type estimateNextBlockType = (block: ITimeBlockBase) => ITimetableFormCache
/**
 * Calculates a form cache using the provided block. Uses the end time of the block as start time and
 * the duration of the block added to the selected start time. Based on the duration and start time, the day
 * is also updated.
 * @param block The block that is used to estimate and generate a form cache
 * @returns A form cache
 */
export const estimateNextBlock: estimateNextBlockType = block => {
    // Getting the duration of the given block
    const duration = getDurationMinutes(block)

    // Sets the end time of the new block as the start
    const startTime: ITime = block.endTime

    // Add duration and calculates time and day
    const { newEndTime, newDay } = addDurationToTime(startTime, block.day, duration)

    const cache: ITimetableFormCache = {
        startTime: block.endTime,
        endTime: newEndTime,
        day: newDay,
        subjects: []
    }
    return cache
}

type generateSubjectsType = (blocks: IBlocks) => ITimetableSubject[]
/**
 * Generates a list of subjects from the provided blocks. No duplicates will be found in the list.
 * @param blocks The week object with block that is used to generate subjects
 * @returns A list of subjects from the provided blocks
 */
export const generateSubjects: generateSubjectsType = blocks => {
    const subjects: ITimetableSubject[] = []

    // A map/object to store all subjects so that no duplicates exists
    const tempSubjects: { [key: string]: ITimetableSubject } = {}

    // Iterating through each day and generating subjects
    dayIds.forEach(dayId => {
        blocks[dayId].forEach(block => {
            // Title in lowercase is used as a id for the subject in the map
            const title = block.title.toLowerCase()

            // Check if the subject already exists in the map. If not, create a new subject
            if (!tempSubjects[title]) {
                tempSubjects[title] = {
                    title: block.title,
                    description: block.description,
                    color: block.color
                }
            }
        })
    })

    // Converting the subjects map to an array
    Object.values(tempSubjects).forEach(subject => subjects.push(subject))

    return subjects
}

type updateSubjectsType = (subjects: ITimetableSubject[], block: ITimeBlock | ITimeBlockBase) => ITimetableSubject[]
/**
 * Generates a new list of subjects based on the block added or updated
 * @param subjects The old subjects cache in the state
 * @param block The block that is added or updated in the state
 * @returns The new subjects list with updated or added subject
 */
export const updateSubjects: updateSubjectsType = (subjects, block) => {
    if (block == null) {
        return subjects || []
    }

    // Boolean flag for checking whether any subject was updated
    let wasUpdated = false

    // New subjects
    const newSubjects: ITimetableSubject[] = []

    // Iterating through the subjects array
    subjects.forEach(subject => {
        // If the subject title matches with the block title, then it is updated
        if (subject.title.toLowerCase() === block.title.toLowerCase()) {
            wasUpdated = true
            // Substituted with the new block's data
            newSubjects.push({
                title: block.title,
                description: block.description,
                color: block.color
            })
        } else {
            newSubjects.push(subject)
        }
    })

    if (!wasUpdated) {
        newSubjects.push({
            title: block.title,
            description: block.description,
            color: block.color
        })
    }

    return newSubjects
}

type shouldShowSubsInSettingsType = (daySubs: ITTDaySubs) => boolean
/**
 * Based on the length of the substitutions made, decides whether to show the section
 * in timetable settings. Greater or equal to 1 sub is need for a true to be returned.
 * @param daySubs Substitutions data from store
 * @returns A boolean indicating whether to show or hide
 */
export const shouldShowSubsInSettings: shouldShowSubsInSettingsType = daySubs => {
    for (let i = 0; i < dayIds.length; i++) {
        if (daySubs[dayIds[i]].subWith != null) {
            return true
        }
    }
    return false
}

type checkIsSubBlockCanceledType = (blockToCheck: ITimeBlock, canceledBlocks: string[]) => boolean
/**
 * Check whether the block is canceled. Uses the provided list of canceled ids. If the id of the block
 * is present in the list, a true is returned.
 * @param blockToCheck The TimeBlock that have to be checked
 * @param canceledBlocks List of ids of all the blocks that have been canceled
 * @returns A boolean indicating whether the block is canceled
 */
export const checkIsBlockCanceled: checkIsSubBlockCanceledType = (blockToCheck, canceledBlocks) => {
    for (let i = 0; i < canceledBlocks.length; i++) {
        if (blockToCheck.id === canceledBlocks[i]) {
            return true
        }
    }
    return false
}

type filterNonCanceledBlocksType = (blocks: ITimeBlock[], canceledBlocks: string[]) => ITimeBlock[]
/**
 * Filters and returns a list of blocks that has no canceled blocks
 * @param blocks A list of  blocks that have to be filtered
 * @param canceledBlocks A list of ids of blocks that have been canceled
 * @returns A list of blocks with no canceled blocks
 */
export const filterNonCanceledBlocks: filterNonCanceledBlocksType = (blocks, canceledBlocks) => {
    const map: { [key: string]: boolean } = {}
    canceledBlocks.forEach(id => (map[id] = true))
    return blocks.filter(block => !map[block.id])
}
