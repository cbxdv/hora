import { motion } from 'framer-motion'
import { styled } from 'styled-components'

import { flexCenter } from '@styles/styleDefinitions'

export const ModalContainer = styled.div``

export const ModalDrop = styled(motion.div).attrs(() => ({
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 }
}))`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: ${props => props.theme.modalBackground};
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
`

export const ModalBody = styled.div<{ $height?: string; $width?: string }>`
    height: ${props => (props.$height != null ? `${props.$height}` : `unset`)};
    max-height: 90%;
    width: ${props => (props.$width != null ? `${props.$width}` : `unset`)};
    max-width: 90%;
    padding: 30px;
    margin: auto;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${({ theme }) => theme.background};
`

export const ModalHeader = styled.div<{ $hasTitle?: string }>`
    width: 100%;
    ${flexCenter()};
    justify-content: ${props => (props.$hasTitle ? `space-between` : `flex-end`)};
`

export const ModalHeading = styled.h1`
    font-size: 20px;
    color: ${props => props.theme.text};
`

export const CloseButton = styled.div`
    cursor: pointer;

    & > svg {
        width: 20px;
        height: 20px;
        fill: none;
        stroke: ${props => props.theme.text};
        stroke-width: 2px;
    }
`

export const ModalChild = styled.div<{ $overflowChildren?: boolean }>`
    width: 100%;
    height: 100%;
    overflow: ${({ $overflowChildren }) => ($overflowChildren ? `none` : `hidden`)};
`
