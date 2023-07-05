import { createSlice } from '@reduxjs/toolkit'
import { IState } from '../../@types/StateInterfaces'
import { IServiceDataPayload } from '../../@types/ServiceInterfaces'
import { serviceIS } from '../initialStates'

const serviceSlice = createSlice({
    name: 'service',
    initialState: serviceIS,
    reducers: {
        initializeServiceData(state, action: IServiceDataPayload) {
            state.serviceData.notifications = action.payload
        },
        updateServiceData(state, action: IServiceDataPayload) {
            state.serviceData.notifications = action.payload
        }
    }
})

export default serviceSlice.reducer

export const { initializeServiceData, updateServiceData } = serviceSlice.actions

export const selectNotificationData = (state: IState) => state.service.serviceData.notifications
