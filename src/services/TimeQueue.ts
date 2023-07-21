import { ITime } from '@appTypes/TimeBlockInterfaces'
import { compareTimes, sortTimes } from '@utils/timeUtils'

/**
 * A time based queue that sortes and returns items based on the time that is
 * provided with the object. The queue take a type param that is used with the queue.
 */
class TimeQueue<T> {
    private data: ITime[]
    private dataItems: {
        [time: string]: T[]
    }

    public constructor() {
        this.data = []
        this.dataItems = {}
    }

    private mapTimeToString = (time: ITime) => {
        return `${time.day}-${time.hours}-${time.minutes}-${time.seconds}`
    }

    /**
     * Pushes the data item into the queue for the time the object is present.
     * @param time The time object where the time is present
     * @param data The data item to be enqueue
     */
    enqueue = (time: ITime, data: T) => {
        const timeString = this.mapTimeToString(time)
        if (this.dataItems[timeString] == null) {
            // No entry exists in the specified time. So, have to create entry and add data

            // Adding data to main list and sorting the list
            this.data.push(time)
            sortTimes(this.data)

            // Storing the data items
            this.dataItems[timeString] = [data]
        } else {
            // Already an entry exists in the specified time. So appending the data with the existing data list
            this.dataItems[timeString].push(data)
        }
    }

    /**
     * Gets the front most item time's items and deletes it from the queue
     * @returns The data items present in the the front most of the queue
     */
    dequeue = () => {
        if (this.data.length == 0) {
            return null
        }

        // Getting the front time and deleting it from the list
        const frontTime = this.peekFrontTime()
        this.data.pop()

        if (frontTime == null) {
            return null
        }

        // Mapping the time to string
        const frontTimeString = this.mapTimeToString(frontTime)

        // Extracting the data
        const returnData = this.dataItems[frontTimeString]

        // Deleting the data items
        delete this.dataItems[frontTimeString]

        // Returning the data
        return returnData
    }

    /**
     * The front most time object in the queue is returned.
     * If queue is empty, then a null is returned.
     * @returns Time object or null
     */
    peekFrontTime = () => {
        if (this.data.length === 0) {
            return null
        }
        return this.data[this.data.length - 1]
    }

    /**
     * Clear the queue data items
     */
    clearQueue = () => {
        this.data = []
        this.dataItems = {}
    }

    /**
     * Returns the number of time objects present in the queue
     * @returns The length of the length
     */
    getTimeLength = () => {
        return this.data.length
    }

    /**
     * Returns the number of data items present in the queue
     * @returns The length of data items
     */
    getItemsLength = () => {
        let sum = 0
        Object.keys(this.dataItems).forEach(t => {
            sum += this.dataItems[t].length
        })
        return sum
    }

    /**
     * Removes all the items in the queue that is lesser than the provided time.
     * This helps in maintaining the queue synced with the provided time.
     * @param target The minimum time that has to be maintained in the queue
     */
    removeAllBefore = (target: ITime) => {
        this.data = this.data.filter(time => {
            const com = compareTimes(time, target)
            if (com === 1) {
                delete this.dataItems[this.mapTimeToString(time)]
                return false
            }
            return true
        })
    }
}

export default TimeQueue
