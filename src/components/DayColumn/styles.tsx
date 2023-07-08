import { motion } from 'framer-motion'
import { styled } from 'styled-components'

import { flexCenter } from '@styles/styleDefinitions'

export const DayColumnContainer = styled(motion.div).attrs(() => ({
    initial: { opacity: 0, width: 0 },
    animate: { opacity: 1, width: `100%` },
    exit: { opacity: 0, width: 0 }
}))<{ $dayId: number }>`
    width: 100%;
    height: 2200px;

    // Rejecting styles if it is first and last day
    margin-left: 2.5px;
    margin-right: 2.5px;
    ${props => (props.$dayId == 1 ? `margin-left: 0` : ``)};
    ${props => (props.$dayId == 0 ? `margin-right: 0` : ``)};
    transition: translate 0.2s linear;
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
    font-size: 14px;
    font-weight: 500;
`

export const SubsIndicatorText = styled.span`
    color: ${props => props.theme.text};
`
