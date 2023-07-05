import { IBlockTime, dayIdTypes } from '../@types/TimeBlockInterfaces'

/**
 * Get a 12-hour based time string
 * @param time Block time object to be converted
 * @returns String in the format `hour`:`minutes`:`am` / `pm`
 */
export const blockTimeTo12HourStr = (time: IBlockTime) => {
    // Extracting the information
    let { hours } = time
    const { minutes } = time

    // Storing a.m. and p.m.
    const ampm = `${hours >= 12 ? `p.m` : `a.m`}`

    // Changing hours to 12 hours format
    if (hours > 12) hours -= 12

    // Padding with 0 to achieve a 2 char output
    const hoursStr = hours24To12(hours).toString().padStart(2, '0')
    const minutesStr = minutes.toString().padStart(2, '0')

    return `${hoursStr}:${minutesStr} ${ampm}`
}

/**
 * Gets a day string corresponding to the given ID
 * @param dayId The ID of the day from 0 to 6 starting from Sunday
 * @returns Captalized string of the day in the week - `Sunday`, `Monday`, `Tuesday`, `Wednesday`, `Thursday`, `Friday`, `Saturday`
 */
export const convertDayIdToName = (dayId: dayIdTypes) => {
    switch (dayId) {
        case 1:
            return 'Monday'
        case 2:
            return 'Tuesday'
        case 3:
            return 'Wednesday'
        case 4:
            return 'Thursday'
        case 5:
            return 'Friday'
        case 6:
            return 'Saturday'
        case 0:
            return 'Sunday'
    }
}

/**
 * Converts a 24-hour clock hour component to 12-hour clock hour component
 * @param hours Hour number represented in 24-hour clock
 * @returns Hour number based on 12-hour clock
 */
export const hours24To12 = (hours: number) => {
    if (hours === 0) {
        return 12
    } else if (hours <= 12) {
        return hours
    } else {
        return hours - 12
    }
}

/**
 * Converts a 12-hour clock hour component to 24-hour clock hour component
 * @param hours Hour number represented in 12-hour clock
 * @param ampm String that is `am` or `pm` in the clock
 * @returns Hour number based on the 24-hour clock
 */
export const hours12To24 = (hours: number, ampm: 'am' | 'pm') => {
    if (ampm === 'am') {
        if (hours === 12) {
            return 0
        }
        return hours
    } else {
        if (hours === 12) {
            return 12
        }
        return hours + 12
    }
}

/**
 * Returns the `am` or `pm` component based on the hour number provided
 * @param hours Hour number represented in 24-hour clock
 * @returns String representing `am` or `pm`
 */
export const getAmPm = (hours: number) => (hours < 12 ? 'am' : 'pm')
