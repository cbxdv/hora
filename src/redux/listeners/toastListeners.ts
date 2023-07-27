import { ToastTypes } from '@appTypes/AppInterfaces'
import { AppListeners } from '@redux/listeners'
import { toastAdded } from '@redux/slices/appSlice'
import { ttBlockAdded, ttBlockDeleted, ttCancellationAdded, ttCancellationDeleted } from '@redux/slices/timetableSlice'

const toastListeners: AppListeners = {
    ttBlockAddedToast(startListening) {
        startListening({
            actionCreator: ttBlockAdded,
            effect: (_, listenerApi) => {
                listenerApi.dispatch(toastAdded({ message: `New block added`, type: ToastTypes.Info }))
            }
        })
    },

    ttBlockDeletedToast(startListening) {
        startListening({
            actionCreator: ttBlockDeleted,
            effect: (_, listenerApi) => {
                listenerApi.dispatch(toastAdded({ message: `Block deleted`, type: ToastTypes.Danger }))
            }
        })
    },

    ttBlockCancellationAddedToast(startListening) {
        startListening({
            actionCreator: ttCancellationAdded,
            effect: (_, listenerApi) => {
                listenerApi.dispatch(
                    toastAdded({
                        message: `Block cancelled. No notification will be sent`,
                        type: ToastTypes.Warn
                    })
                )
            }
        })
    },

    ttBlockCancellationDeletedToast(startListening) {
        startListening({
            actionCreator: ttCancellationDeleted,
            effect: (_, listenerApi) => {
                listenerApi.dispatch(toastAdded({ message: `Block uncancelled`, type: ToastTypes.Info }))
            }
        })
    }
}

export default toastListeners
