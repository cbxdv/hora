import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'

import { IToastContent, ToastTypes } from '@appTypes/AppInterfaces'

import CrossIcon from '@assets/icons/Cross.svg'
import DangerIcon from '@assets/icons/Danger.svg'
import InformationIcon from '@assets/icons/Information.svg'
import WarningIcon from '@assets/icons/Warning.svg'

import { selectToasts } from '@redux/selectors/appSelectors'
import { toastRemoved } from '@redux/slices/appSlice'
import { useAppDispatch, useAppSelector } from '@redux/store'

import * as s from './styles'

const Toast: React.FC<{ toast: IToastContent }> = ({ toast }) => {
    const dispatch = useAppDispatch()

    const closeHandler = () => {
        dispatch(toastRemoved(toast))
    }

    useEffect(() => {
        setTimeout(() => {
            // Closing toast after 3 seconds
            dispatch(toastRemoved(toast))
        }, 3000)
    }, [])

    const getIcon = (type: ToastTypes) => {
        switch (type) {
            case ToastTypes.Info:
                return <InformationIcon />
            case ToastTypes.Danger:
                return <DangerIcon />
            case ToastTypes.Warn:
                return <WarningIcon />
            default:
                return <></>
        }
    }

    return (
        <s.ToastContainer $type={toast.type}>
            <s.ToastIcon $type={toast.type}>{getIcon(toast.type)}</s.ToastIcon>
            <s.ToastText $type={toast.type}>{toast.message}</s.ToastText>
            <s.CloseContainer $type={toast.type} onClick={closeHandler}>
                <CrossIcon />
            </s.CloseContainer>
        </s.ToastContainer>
    )
}

export const ToastsContainer = () => {
    const toastData = useAppSelector(selectToasts)

    return (
        <s.ToastsContainerDiv>
            <AnimatePresence>
                {toastData.map(td => (
                    <Toast key={td.id} toast={td} />
                ))}
            </AnimatePresence>
        </s.ToastsContainerDiv>
    )
}

export default Toast
