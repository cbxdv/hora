import { motion } from 'framer-motion'
import { styled } from 'styled-components'

import { flexCenter, hoverAndTapMotion, subtleBorder } from '@styles/styleDefinitions'

export const TimeInputContainer = styled(motion.div).attrs(() => ({
    initial: { height: 0 },
    animate: { height: `150px` },
    exit: { height: 0 },
    transition: { duration: 0.2 }
}))`
    width: 140px;
    height: 150px;
    ${flexCenter({ justifyContent: `space-between` })};
    position: absolute;
    left: 0;
    top: 110%;
    border-radius: 8px;
    background-color: ${props => props.theme.contextBackground};
    backdrop-filter: blur(4px);
    padding: 0 5px;
    z-index: 1;
    box-shadow: ${({ theme }) => theme.shadow};
    ${subtleBorder}
`

export const TimeInputComponent = styled.div`
    overflow: auto;
    color: ${props => props.theme.text};
    height: 100%;
`

export const DropdownItem = styled(motion.div).attrs(({ theme }) => ({
    ...hoverAndTapMotion(theme.name)
}))<{ $selected: boolean }>`
    width: 100%;
    height: 30px;
    ${flexCenter({ justifyContent: `space-between` })};
    padding: 0 10px;
    font-size: 12px;
    border-radius: 8px;
    background-color: ${props => (props.$selected ? `${props.theme.selected}` : `transparent`)};
    cursor: pointer;
    border: 0.1px solid transparent;
    margin: 5px 0;
    scale: 1;

    & > svg {
        height: 16px;
        width: 16px;
        stroke: ${props => props.theme.text};
        stroke-width: 3px;
    }
`
