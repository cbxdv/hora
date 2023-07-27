import { motion } from 'framer-motion'
import { styled } from 'styled-components'

import { flexCenter, hoverAndTapMotion, subtleBorder } from '@styles/styleDefinitions'

export const ValueDropdownContainer = styled(motion.div).attrs(() => ({
    initial: { maxHeight: 0 },
    animate: { maxHeight: 150 },
    exit: { maxHeight: 0 },
    transition: { duration: 0.2 }
}))`
    width: 100%;
    position: absolute;
    left: 0;
    top: 110%;
    border-radius: 8px;
    background-color: ${props => props.theme.contextBackground};
    backdrop-filter: blur(4px);
    color: ${props => props.theme.text};
    font-size: 13px;
    padding: 0 5px;
    z-index: 1;
    max-height: 150px;
    overflow: auto;
    box-shadow: ${({ theme }) => theme.shadow};
    ${subtleBorder}
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

    & > svg {
        height: 16px;
        width: 16px;

        & > path {
            stroke: ${props => props.theme.text};
            stroke-width: 3px;
        }
    }
`
