import styled from 'styled-components'

import { buttonWithStyles } from '@styles/styleDefinitions'

export const NewBlockButtonContainer = styled(buttonWithStyles)`
    height: 36px;
    font-size: 14px;
`

export const ButtonIconContainer = styled.div`
    height: 20px;
    width: 20px;
    margin-right: 10px;

    & > svg {
        fill: none;
        stroke: ${({ theme }) => theme.text};
        stroke-width: 2px;
    }
`
