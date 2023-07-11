import { styled } from 'styled-components'

import { buttonWithStyles, flexCenter } from '@styles/styleDefinitions'

export const IconButtonContainer = styled(buttonWithStyles)<{ $size: number }>`
    width: ${({ $size }) => $size}px;
    height: ${({ $size }) => $size}px;
    scale: 1;
`

export const IconContainer = styled.div`
    height: 20px;
    width: 20px;
    ${flexCenter()};

    & > svg {
        height: 20px;
        width: 20px;
        stroke-width: 2px;
        fill: none;
        stroke: ${({ theme }) => theme.text};
    }
`
