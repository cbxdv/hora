import { stopNotificationService } from '@services/notificationService'
import { stopServiceDataService } from '@services/serviceDataUpdater'

/**
 * Stop all the service timers that can be running in the background
 */
export const stopAllServiceTimers = () => {
    stopNotificationService()
    stopServiceDataService()
}
