import { ITime, ITimeBlock, ITimeBlockBase, TimeM } from '@appTypes/TimeBlockInterfaces'

/**
 * Get a 12-hour based time string
 * @param time Block time object to be converted
 * @param withSeconds Indicates whether the seconds should be included in the string
 * @returns String in the format `hour`:`minutes`:`am` / `pm`
 */
export const timeObjectTo12HourStr = (time: ITime, withSeconds = false) => {
    // Extracting the information
    let { hours } = time
    const { minutes, seconds } = time

    // Storing a.m. and p.m.
    const timeAmPm = `${hours >= 12 ? `p.m` : `a.m`}`

    // Changing hours to 12 hours format
    if (hours > 12) {
        hours -= 12
    }

    // Padding with 0 to achieve a 2 char output
    const hoursStr = hours24To12(hours).toString().padStart(2, `0`)
    const minutesStr = minutes.toString().padStart(2, `0`)

    if (withSeconds) {
        const secondsStr = seconds.toString().padStart(2, `0`)
        return `${hoursStr}:${minutesStr}:${secondsStr} ${timeAmPm}`
    }

    return `${hoursStr}:${minutesStr} ${timeAmPm}`
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
 * @param timeAmPm String that is `am` or `pm` in the clock
 * @returns Hour number based on the 24-hour clock
 */
export const hours12To24 = (hours: number, timeAmPm: TimeM) => {
    if (timeAmPm === TimeM.AM) {
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
export const getAmPm = (hours: number) => (hours < 12 ? TimeM.AM : TimeM.PM)

/**
 * Calculates the duration of block in minutes
 * @param block A TimeBlock
 * @returns Duration in minutes
 */
export const getDurationMinutes = (block: ITimeBlockBase) => {
    const start = new Date()
    const end = new Date()
    start.setHours(block.startTime.hours)
    start.setMinutes(block.startTime.minutes)
    start.setSeconds(block.endTime.seconds)
    end.setHours(block.endTime.hours)
    end.setMinutes(block.endTime.minutes)
    end.setSeconds(block.endTime.seconds)
    return Math.floor((end.valueOf() - start.valueOf()) / 1000 / 60)
}

type addDurationToTimeProps = (time: ITime, durationMinutes: number) => ITime
/**
 * Calculates and adds duration to the block time and returns a new time and day
 * @param time Time to which the duration have to be added
 * @param durationMinutes The amount of minutes to add to the block
 * @returns An object with added block time and a new day ID if time exceed a threshold
 */
export const addDurationToTime: addDurationToTimeProps = (time, durationMinutes) => {
    let { hours, minutes, day } = time
    const { seconds } = time
    minutes += durationMinutes
    if (minutes < 0) {
        hours -= Math.floor(minutes / 60)
        minutes = -Math.floor(minutes / 60) * 60 + minutes
    } else {
        hours += Math.floor(minutes / 60)
        minutes = minutes % 60
    }
    if (hours >= 24) {
        day += Math.floor(hours / 24) % 7
        hours = hours % 24
    }
    return { hours, minutes, seconds, day }
}

/**
 * Calculates and adds duration to the block time and returns a new time. The time is limited to the
 * provided day. If exceeds the current day, it is limited to 23:59, last minute of the day
 * @param time Time to which the duration have to be added
 * @param durationMinutes The amount of minutes to add to the block
 * @returns An object with added block time and a new day ID if time exceed a threshold
 */
export const addDurationToTimeLimited: addDurationToTimeProps = (time, durationMinutes) => {
    const added = addDurationToTime(time, durationMinutes)
    if (added.day != time.day) {
        added.hours = 23
        added.minutes = 59
        added.seconds = 59
        added.day = time.day
    }
    return added
}

type getRemainingTimeStringType = (time: ITime) => string
/**
 * Calculates difference of the time with current time, then returns a string with hours and
 * minutes representation. If the time is considered to be a component occurring ahead
 * @param time Time object whose difference is to be calculated
 * @returns A string with hours and minutes
 */
export const getRemainingTimeString: getRemainingTimeStringType = time => {
    if (time === null) {
        return ``
    }
    const day = time.day
    // Comparing with the current time
    const currentTime = new Date()
    const endTime = new Date()
    // Comparing day differences between the current day and provided day
    if (day > endTime.getDay()) {
        // If the day provided is ahead, then the their day difference have to be added
        const toAdd = (day.valueOf() - endTime.getDay()) * 86400000
        endTime.setUTCMilliseconds(endTime.getUTCMilliseconds() + toAdd)
    } else if (day < endTime.getDay()) {
        // If the day provided is behind, then their difference is calculated
        // The next occurrence will be the next week so difference is subtracted with 7
        const toAdd = (7 - (endTime.getDay() - day.valueOf())) * 86400000
        endTime.setUTCMilliseconds(endTime.getUTCMilliseconds() + toAdd)
    } else {
        // If both day provided and the current day is same, then checked whether to update day
        // A boolean to indicate whether the time provided is behind the current time
        let isBehind = true
        if (time.hours > endTime.getHours()) {
            /**
             *  ========📦====
             *     👆🏻
             */
            isBehind = false
        }
        if (time.hours === endTime.getHours() && time.minutes > endTime.getMinutes()) {
            /**
             *  ========📦====
             *     👆🏻
             */
            isBehind = false
        }
        // If the block is behind, then the next occurrence of the block is next week.
        // So milliseconds count worth of 7 days is added to the time
        if (isBehind) {
            endTime.setUTCMilliseconds(endTime.getUTCMilliseconds() + 86400000 * 7)
        }
        // If the block has same day, and is not behind, then no logic is required for adding
        // milliseconds of days.
    }
    // The hours and minutes of provided time is set in the object
    endTime.setHours(time.hours)
    endTime.setMinutes(time.minutes)
    // Difference of milliseconds is calculated between them
    // It is maintained that the end time is always greater than current time with the above logic
    const milliseconds = endTime.valueOf() - currentTime.valueOf()
    if (milliseconds <= 0) {
        return ``
    }
    // Minutes is calculated with basic time calculations
    // 1 second = 1000 milliseconds
    // 1 minute = 60 seconds = 60,000 milliseconds
    const minutes = Math.floor(milliseconds / 1000 / 60)
    // If the minutes is lesser than an hours, then hours string is not required
    if (minutes < 60) {
        return `${minutes} mins`
    } else {
        // If the time is exactly divisible by 60, then no minutes residues
        if (minutes % 60 === 0) {
            return `${minutes / 60} hr`
        } else {
            return `${Math.floor(minutes / 60)} hr ${minutes % 60} mins`
        }
    }
}

/**
 * Checks and returns the first currently occurring block in the list provided.
 * @param blocks List of current day blocks that have to be checked
 * @returns A TimeBlock that is occurring now, or null if not any
 */
export const getFirstCurrentBlock = (blocks: ITimeBlock[]) => {
    let newBlock = null
    const currentTime = new Date()
    const currentHour = currentTime.getHours()
    const currentMinutes = currentTime.getMinutes()
    // Iterating through the current day blocks and picking the current block
    for (let i = 0; i < blocks.length; i++) {
        let isCurrent = true
        const block = blocks[i]
        // Checking with all possible options that cannot qualify for current block
        if (currentHour < block.startTime.hours) {
            /**
             *  ========📦📦====
             *     👆🏻
             */
            isCurrent = false
            continue
        }
        if (block.startTime.hours === currentHour && currentMinutes < block.startTime.minutes) {
            /**
             *  ========📦📦====
             *     👆🏻
             */
            isCurrent = false
            continue
        }
        if (block.endTime.hours < currentHour) {
            /**
             *  ====📦📦========
             *             👆🏻
             */
            isCurrent = false
            continue
        }
        if (block.endTime.hours === currentHour && block.endTime.minutes <= currentMinutes) {
            /**
             *  ====📦📦========
             *             👆🏻
             */
            isCurrent = false
            continue
        }
        if (isCurrent && !newBlock) {
            newBlock = block
            break
        }
    }
    return newBlock
}

/**
 * Compares two different time objects and returns an integer that tells the greatest of the both.
 * @param time1 Time object 1
 * @param time2 Time object 2
 * @returns -1 if object 1 is greated. 1 if object 2 is greater. 0 if eaual
 */
export const compareTimes = (time1: ITime, time2: ITime) => {
    if (time1.hours > time2.hours) {
        return -1
    } else if (time1.hours < time2.hours) {
        return 1
    } else if (time1.hours === time2.hours) {
        if (time1.minutes > time2.minutes) {
            return -1
        } else if (time1.minutes < time2.minutes) {
            return 1
        } else if (time1.minutes === time2.minutes) {
            if (time1.seconds > time2.seconds) {
                return -1
            } else if (time1.seconds < time2.seconds) {
                return 1
            } else if (time1.seconds === time2.seconds) {
                return 0
            }
        }
    }
    return 0
}

/**
 * Sort an array of time objects in descending order. The least nearest time is
 * always at the end of the array. Uses the logic of Quick Sort algorithm.
 * @param times An array with times sorted
 */
export const sortTimes = (times: ITime[]) => {
    const partition = (array: ITime[], low: number, high: number) => {
        const pivot = array[high]
        let i = low - 1
        for (let j = low; j < high; j++) {
            if (compareTimes(array[j], pivot) === -1) {
                i = i + 1
                const temp = array[j]
                array[j] = array[i]
                array[i] = temp
            }
        }
        const temp = array[i + 1]
        array[i + 1] = array[high]
        array[high] = temp
        return i + 1
    }

    const sort = (array: ITime[], low: number, high: number) => {
        if (low < high) {
            const pivot = partition(array, low, high)
            sort(array, low, pivot - 1)
            sort(array, pivot + 1, high)
        }
    }

    sort(times, 0, times.length - 1)
}

/**
 * Converts a NodeJS Date object to the time object
 * @param date A NodeJS Date object
 * @returns A time object
 */
export const nodeDateToTime = (date: Date): ITime => {
    return {
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds(),
        day: date.getDay()
    }
}
