import { INotifyObject } from '@appTypes/ServiceInterfaces'

import { compareTimes, nodeDateToTime } from '@utils/timeUtils'

import TimeQueue from './TimeQueue'

let QUEUE: TimeQueue<INotifyObject> | null
let timer: NodeJS.Timer

/**
 * The notification service main function.
 * Contains the logic for running the service.
 */
const runner = () => {
    if (QUEUE == null) {
        return
    }

    const runnerHelper = () => {
        if (QUEUE == null) {
            return
        }
        const now = nodeDateToTime(new Date())
        const peekTime = QUEUE.peekFrontTime()
        if (peekTime == null || compareTimes(now, peekTime) !== 0) {
            return
        }
        const items = QUEUE.dequeue()
        if (items == null) {
            return
        }
        items.forEach(item => {
            api.sendNotification({
                title: item.title,
                body: item.body
            })
        })
    }

    runnerHelper()
    timer = setInterval(runnerHelper, 1000)
}

/**
 * Starts the notification service
 * @param dataItems The Notify Objects
 */
export const startNotificationService = (dataItems: INotifyObject[]) => {
    stopNotificationService()

    if (dataItems.length === 0) {
        return
    }

    QUEUE = new TimeQueue()

    // Pushing data
    dataItems.forEach(item => {
        if (QUEUE) {
            QUEUE.enqueue(item.time, item)
        }
    })

    // Removing objects that are previous in time
    const time = nodeDateToTime(new Date())
    QUEUE.removeAllBefore(time)
    if (QUEUE.getTimeLength() === 0) {
        return
    }

    // Run
    runner()
}

/**
 * Stops the notification service.
 * The present current queue will be deleted in the process.
 */
export const stopNotificationService = () => {
    if (QUEUE == null) {
        return
    }
    clearInterval(timer)
    QUEUE.clearQueue()
    QUEUE = null
}
