import { createSlice } from '@reduxjs/toolkit'

import { ServiceDataPayload } from '@appTypes/ServiceInterfaces'

import { ServiceIS } from '@redux/initialStates'

const serviceSlice = createSlice({
    name: `service`,
    initialState: ServiceIS,
    reducers: {
        serviceDataUpdated(state, action: ServiceDataPayload) {
            state.serviceData.notifications = action.payload
        },

        serviceRefreshed(state) {
            state.serviceData.notifications = []
        }
    }
})

export const { serviceDataUpdated, serviceRefreshed } = serviceSlice.actions

export default serviceSlice.reducer
