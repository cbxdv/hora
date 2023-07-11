import { INotifyObject } from '@appTypes/ServiceInterfaces'
import { ITimeBlock } from '@appTypes/TimeBlockInterfaces'
import { ITTNotifyPropType } from '@appTypes/TimetableInterfaces'

// Variable holding the timer of the notification service
let timer: NodeJS.Timer | null = null

/**
 * Handles the notification service
 * @param blocks List of NotifyObject
 */
const notificationService = (blocks: INotifyObject[]) => {
    return setInterval(() => {
        const now = new Date()
        blocks.forEach(block => {
            let shouldNotify = true
            shouldNotify = shouldNotify && block.time.hours === now.getHours()
            shouldNotify = shouldNotify && block.time.minutes === now.getMinutes()
            shouldNotify = shouldNotify && now.getSeconds() === 0
            if (shouldNotify) {
                api.sendNotification({
                    title: block.title,
                    body: block.body
                })
            }
        })
    }, 1000)
}

/**
 * Stops the notification service
 */
export const stopNS = () => {
    if (timer == null) {
        return
    }
    clearInterval(timer)
    timer = null
}

/**
 * Starts the notification service
 */
export const startNS = (blocks: INotifyObject[]) => {
    stopNS()
    timer = notificationService(blocks)
}

type generateNotifyType = (blocks: ITimeBlock[], notifyProperties: ITTNotifyPropType) => INotifyObject[]

/**
 * Generates NotifyObjects for the given blocks corresponding to the given properties
 * @param blocks Time blocks for which the NotifyObjects have to be generated
 * @param notifyProperties Properties of the objects to generated, which include `notifyStart`, `notifyStartBefore`, `notifyEnd`, `notifyEndBefore`
 * @returns  a list of NotifyObjects
 */
export const generateNotifyObjects: generateNotifyType = (
    blocks: ITimeBlock[],
    notifyProperties: ITTNotifyPropType
) => {
    const { notifyStart, notifyStartBefore, notifyEnd, notifyEndBefore } = notifyProperties
    const objects: INotifyObject[] = []

    // Iterating through the blocks and generating notifyObjects
    blocks.forEach(block => {
        // Start notifications
        if (notifyStart) {
            const time = { ...block.startTime }
            time.minutes -= notifyStartBefore

            objects.push({
                id: block.id,
                title: `${block.title} starts ${notifyStartBefore !== 0 ? `in ${notifyStartBefore} minutes` : `now`}`,
                body: block.description,
                time
            })
        }

        // End notifications
        if (notifyEnd) {
            const time = { ...block.endTime }
            time.minutes -= notifyEndBefore

            objects.push({
                id: block.id,
                title: `${block.title} ends ${notifyEndBefore !== 0 ? `in ${notifyEndBefore} minutes` : `now`}`,
                body: block.description,
                time
            })
        }
    })

    return objects
}
