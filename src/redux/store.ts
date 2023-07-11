import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import listenerMiddleware from '@redux/listeners'
import appReducer from '@redux/slices/appSlice'
import serviceReducer from '@redux/slices/serviceSlice'
import timetableReducer from '@redux/slices/timetableSlice'

const rootReducer = combineReducers({
    app: appReducer,
    service: serviceReducer,
    timetable: timetableReducer
})

const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleWare => getDefaultMiddleWare().concat(listenerMiddleware)
})

export default store

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
