import { styled } from 'styled-components'

import { flexCenter } from '@styles/styleDefinitions'

export const DayColumnContainer = styled.div<{ $dayId: number }>`
    width: 100%;
    height: 100%;

    // Rejecting styles if it is first and last day
    margin-left: 2.5px;
    margin-right: 2.5px;
    ${(props) => (props.$dayId == 1 ? `margin-left: 0` : ``)}
    ${(props) => (props.$dayId == 0 ? `margin-right: 0` : ``)}
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
    background-color: ${(props) => props.theme.background};
    color: ${(props) => (props.$today ? `#FD2513` : `default`)};
    position: sticky;
    top: 90px;
    z-index: 1;
    font-size: 14px;
    font-weight: 500;
`
