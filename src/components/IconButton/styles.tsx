import { styled } from 'styled-components'

import { buttonWithStyles, flexCenter } from '@styles/styleDefinitions'

export const IconButtonContainer = styled(buttonWithStyles)`
    width: 100%;
    height: 30px;
    min-height: 30px;
    scale: 1;
`

export const IconContainer = styled.div`
    height: 20px;
    width: 20px;
    ${flexCenter()};

    & > svg {
        height: 20px;
        width: 20px;

        & > path {
            stroke-width: 2px;
            stroke: ${({ theme }) => theme.text};
        }
    }
`

export const TextContainer = styled.div`
    margin-left: 6px;
`
