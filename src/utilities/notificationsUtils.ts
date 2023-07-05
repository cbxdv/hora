import { INotifObject, notifyPropertiesType } from '../@types/ServiceInterfaces'
import { ITimeBlock } from '../@types/TimeBlockInterfaces'

// Variable holding the timer of the notification service
let timer: NodeJS.Timer | null = null

/**
 * Handles the notification service
 * @param blocks List of NotifyObject
 */
const notificationService = (blocks: INotifObject[]) => {
    return setInterval(() => {
        const now = new Date()

        // Reload if state is time is 00:00
        if (now.getHours() === 0 && now.getMinutes() === 0 && now.getSeconds() === 0) {
            location.reload()
        }

        blocks.forEach((block) => {
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
export const startNS = (blocks: INotifObject[]) => {
    stopNS()
    timer = notificationService(blocks)
}

type generateNotifyType = (blocks: ITimeBlock[], notifyProperties: notifyPropertiesType) => INotifObject[]

/**
 * Generates NotifObjects for the given blocks corresponding to the given properties
 * @param blocks Time blocks for which the NotifObjects have to be generated
 * @param notifyProperties Properties of the objects to generated, which include `notifyStart`, `notifyStartBefore`, `notifyEnd`, `notifyEndBefore`
 * @returns  a list of NotifObjects
 */
export const generateNotifObjects: generateNotifyType = (
    blocks: ITimeBlock[],
    notifyProperties: notifyPropertiesType
) => {
    const { notifyStart, notifyStartBefore, notifyEnd, notifyEndBefore } = notifyProperties
    const objects: INotifObject[] = []

    // Iterating through the blocks and generating notifyObjects
    blocks.forEach((block) => {
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
