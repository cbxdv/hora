import { ToastTypes } from '@appTypes/AppInterfaces'
import { flexCenter, hoverAndTapMotion, subtleBorder } from '@styles/styleDefinitions'
import { motion } from 'framer-motion'
import { styled } from 'styled-components'

export const ToastsContainerDiv = styled.div`
    width: 100%;
    position: absolute;
    bottom: 60px;
    ${flexCenter({ flexDirection: 'column' })};
    z-index: 5;
`

export const ToastContainer = styled(motion.div).attrs(() => ({
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
}))<{ $type: ToastTypes }>`
    ${flexCenter()};
    background: ${({ theme, $type }) =>
        $type === ToastTypes.Info
            ? `rgba(157, 220, 250, 0.4)`
            : $type === ToastTypes.Danger
            ? `rgba(250, 163, 157, 0.4)`
            : $type === ToastTypes.Warn
            ? `rgba(250, 220, 157, 0.4)`
            : theme.contextBackground};
    padding: 5px 10px;
    border-radius: 14px;
    ${subtleBorder};
    box-shadow: ${({ theme }) => theme.shadow};
    backdrop-filter: blur(4px);
    margin: 10px;
    max-width: 50%;
`

export const ToastText = styled.div<{ $type: ToastTypes }>`
    color: ${({ $type }) =>
        $type === ToastTypes.Info
            ? `rgb(0, 36, 53)`
            : $type === ToastTypes.Danger
            ? `rgb(44, 3, 0)`
            : $type === ToastTypes.Warn
            ? `rgb(54, 36, 0)`
            : `#29272c`};
    font-weight: 500;
`

export const ToastIcon = styled.div<{ $type: ToastTypes }>`
    ${flexCenter()};
    height: 20px;
    width: 20px;
    cursor: pointer;
    margin-right: 10px;
    margin-left: 10px;

    & > svg {
        height: 20px;
        width: 20px;

        & > path {
            stroke: ${({ $type }) =>
                $type === ToastTypes.Info
                    ? `rgb(0, 36, 53)`
                    : $type === ToastTypes.Danger
                    ? `rgb(44, 3, 0)`
                    : $type === ToastTypes.Warn
                    ? `rgb(54, 36, 0)`
                    : `#29272c`};
            stroke-width: 2px;
        }
    }
`

export const CloseContainer = styled(motion.div).attrs(({ theme }) => ({
    ...hoverAndTapMotion(theme.name)
}))<{ $type: ToastTypes }>`
    ${flexCenter()};
    cursor: pointer;
    margin-left: 20px;

    & > svg {
        height: 20px;
        width: 20px;

        & > path {
            stroke: ${({ $type }) =>
                $type === ToastTypes.Info
                    ? `rgb(0, 36, 53)`
                    : $type === ToastTypes.Danger
                    ? `rgb(44, 3, 0)`
                    : $type === ToastTypes.Warn
                    ? `rgb(54, 36, 0)`
                    : `#29272c`};
            stroke-width: 2px;
        }
    }
`
