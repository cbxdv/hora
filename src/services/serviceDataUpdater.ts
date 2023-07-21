import { stopNotificationService } from './notificationService'

let timer: NodeJS.Timer

export const startServiceDataService = (refresher: () => void) => {
    stopServiceDataService()

    const runner = () => {
        // A timer for updating notification data at day change
        let prev = new Date().getDay()
        const timer = setInterval(() => {
            const now = new Date()
            if (now.getDay() !== prev) {
                clearInterval(timer)
                stopNotificationService()

                // Refreshing data
                refresher()
            }
            prev = now.getDay()
        }, 1000)
    }

    runner()
}

export const stopServiceDataService = () => {
    stopNotificationService()
    clearInterval(timer)
}
