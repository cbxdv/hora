import { styled } from 'styled-components'
import { buttonStyles, flexCenter } from '../../styles/styleUtils'

export const IconButtonContainer = styled.button<{ $size: number }>`
    ${buttonStyles()};
    width: ${({ $size }) => $size}px;
    height: ${({ $size }) => $size}px;
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
