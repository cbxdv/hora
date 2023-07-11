import { IState } from '@appTypes/StateInterfaces'

export const selectNotificationData = (state: IState) => state.service.serviceData.notifications
