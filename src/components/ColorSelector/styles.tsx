import { motion } from 'framer-motion'
import { styled } from 'styled-components'

import { flexCenter } from '@styles/styleDefinitions'

export const ColorSelectorContainer = styled(motion.div).attrs(() => ({
    initial: { height: 0 },
    animate: { height: `unset` },
    exit: { height: 0 },
    transition: { duration: 0.2 }
}))`
    position: absolute;
    top: 110%;
    border-radius: 8px;
    background-color: ${(props) => props.theme.background};
    left: 0;
    box-shadow: ${({ theme }) => (theme.name === `light` ? `0px 0px 4px rgba(0, 0, 0, 0.25)` : ``)};
    z-index: 1;
    width: 100%;
    overflow: auto;
    padding: 0 5px;
`

export const ColorButtonContainer = styled(motion.div).attrs(({ theme }) => ({
    whileHover: { borderColor: `${theme.name === `light` ? `rgba(0, 0, 0, 0.1)` : `rgba(255, 255, 255, 0.2)`}` }
}))<{ $selected: boolean }>`
    ${flexCenter()};
    cursor: pointer;
    height: 22px;
    width: 22px;
    border: solid ${(props) => (props.$selected ? `2px ${props.theme.selected}` : ` 0.1px transparent`)};
    margin: 5px;
    border-radius: 4px;
    float: left;
`

export const ColorButton = styled.div<{ $color: string }>`
    background: ${(props) => props.$color};
    height: 14px;
    width: 14px;
    border-radius: 4px;
`
