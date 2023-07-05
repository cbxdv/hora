import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import appReducer from './slices/appSlice'
import timetableReducer from './slices/timetableSlice'
import serviceReducer from './slices/serviceSlice'
import listenerMiddleware from './listeners'

const store = configureStore({
    reducer: {
        app: appReducer,
        service: serviceReducer,
        timetable: timetableReducer
    },
    middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat(listenerMiddleware)
})

export default store

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
