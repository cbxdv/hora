import { INotifyObject } from '@appTypes/ServiceInterfaces'
import { ITimeBlock } from '@appTypes/TimeBlockInterfaces'
import { ITTNotifyPropType } from '@appTypes/TimetableInterfaces'

import { addDurationToTime } from './timeUtils'

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
            const time = addDurationToTime({ ...block.startTime }, -notifyStartBefore)

            objects.push({
                id: block.id,
                title: `${block.title} starts ${notifyStartBefore !== 0 ? `in ${notifyStartBefore} minutes` : `now`}`,
                body: block.description,
                time
            })
        }

        // End notifications
        if (notifyEnd) {
            const time = addDurationToTime({ ...block.startTime }, -notifyEndBefore)

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
