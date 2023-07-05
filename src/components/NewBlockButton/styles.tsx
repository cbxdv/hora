import styled from 'styled-components'
import { buttonStyles } from '../../styles/styleUtils'

export const NewBlockButtonContainer = styled.div`
    ${buttonStyles()};
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
