import { motion } from 'framer-motion'
import { styled } from 'styled-components'

import { flexCenter } from '@styles/styleDefinitions'

const containerMotion = {
    hide: { opacity: 0, maxWidth: 0, margin: 0, padding: 0 },
    show: { opacity: 1, maxWidth: `100%`, margin: `0 2.5px` }
}

export const DayColumnContainer = styled(motion.div).attrs(() => ({
    variants: containerMotion,
    initial: `hide`,
    animate: `show`,
    exit: `hide`
}))<{ $dayId: number }>`
    width: 100%;
    height: 2200px;
    margin-left: 2.5px;
    margin-right: 2.5px;
`

export const BlocksContainer = styled.div`
    ${flexCenter({ flexDirection: `column` })}
    background-color: ${({ theme }) => theme.shade1};
    height: 2160px;
    border-radius: 8px;
    position: relative;
`

export const DayIndicator = styled.div<{ $today: boolean }>`
    ${flexCenter()};
    height: 40px;
    width: 100%;
    background-color: ${props => props.theme.background};
    color: ${props => (props.$today ? `#FD2513` : `default`)};
    position: sticky;
    top: 0;
    left: 0;
    z-index: 1;
    font-weight: 500;
`

export const SubsIndicatorText = styled.span`
    color: ${props => props.theme.text};
`
