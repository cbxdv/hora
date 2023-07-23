import { styled } from 'styled-components'

import { flexCenter } from '@styles/styleDefinitions'

export const AlertContainer = styled.div`
    margin-top: 10px;
`

export const ButtonsContainer = styled.div`
    ${flexCenter()};
    margin-top: 14px;
`

export const ButtonContainer = styled.div<{ $marginLeft?: boolean; $marginRight?: boolean }>`
    ${({ $marginLeft }) => ($marginLeft ? `margin-left: 5px` : ``)};
    ${({ $marginRight }) => ($marginRight ? `margin-right: 5px` : ``)};
`
