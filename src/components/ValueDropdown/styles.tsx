import { styled } from 'styled-components'
import { motion } from 'framer-motion'
import { flexCenter } from '../../styles/styleDefinitions'

export const ValueDropdownContainer = styled(motion.div).attrs(() => ({
    initial: { height: 0 },
    animate: { height: 'unset' },
    exit: { height: 0 },
    transition: { duration: 0.2 }
}))`
    width: 100%;
    position: absolute;
    left: 0;
    top: 110%;
    border-radius: 8px;
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.text};
    font-size: 13px;
    padding: 0 5px;
    z-index: 1;
    max-height: 150px;
    overflow: scroll;
    box-shadow: ${({ theme }) => (theme.name === 'light' ? `0px 0px 4px rgba(0, 0, 0, 0.25)` : ``)};
`
export const DropdownItem = styled(motion.div).attrs(({ theme }) => ({
    whileHover: { borderColor: `${theme.name === 'light' ? `rgba(0, 0, 0, 0.1)` : `rgba(255, 255, 255, 0.2)`}` }
}))<{ $selected: boolean }>`
    width: 100%;
    height: 30px;
    ${flexCenter({ justifyContent: 'space-between' })};
    padding: 0 10px;
    font-size: 12px;
    border-radius: 8px;
    background-color: ${(props) => (props.$selected ? `${props.theme.selected}` : `transparent`)};
    cursor: pointer;
    border: 0.1px solid transparent;
    margin: 5px 0;

    & > svg {
        height: 16px;
        width: 16px;
        stroke: ${(props) => props.theme.text};
        stroke-width: 3px;
    }
`
