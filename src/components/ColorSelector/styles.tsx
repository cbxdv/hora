import { motion } from 'framer-motion'
import { styled } from 'styled-components'

import { flexCenter, hoverAndTapMotion, subtleBorder } from '@styles/styleDefinitions'

export const ColorSelectorContainer = styled(motion.div).attrs(() => ({
    initial: { height: 0 },
    animate: { height: 100 },
    exit: { height: 0 },
    transition: { duration: 0.2 }
}))`
    position: absolute;
    top: 110%;
    border-radius: 8px;
    background-color: ${props => props.theme.contextBackground};
    backdrop-filter: blur(4px);
    left: 0;
    z-index: 1;
    width: 100%;
    overflow: auto;
    padding: 0 5px;
    box-shadow: ${({ theme }) => theme.shadow};
    ${subtleBorder}
`

export const ColorsContainer = styled.div`
    width: 95%;
    height: 100%;
    margin: auto;
`

export const ColorButtonContainer = styled(motion.div).attrs(({ theme }) => ({
    ...hoverAndTapMotion(theme.name)
}))<{ $selected: boolean }>`
    ${flexCenter()};
    cursor: pointer;
    height: 22px;
    width: 22px;
    border: solid ${props => (props.$selected ? `2px ${props.theme.selected}` : ` 0.1px transparent`)};
    margin: 5px;
    border-radius: 4px;
    float: left;
`

export const ColorButton = styled.div<{ $color: string }>`
    background: ${props => props.$color};
    height: 14px;
    width: 14px;
    border-radius: 4px;
`
