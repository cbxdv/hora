import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import listenerMiddleware from '@redux/listeners'
import appReducer from '@redux/slices/appSlice'
import serviceReducer from '@redux/slices/serviceSlice'
import timetableReducer from '@redux/slices/timetableSlice'

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
