import { styled } from 'styled-components'

import { flexCenter } from '../../styles/styleUtils'

export const TimeInputContainer = styled.div`
    width: 140px;
    height: 150px;
    ${flexCenter({ justifyContent: 'space-between' })};
    position: absolute;
    left: 0;
    top: 110%;
    border-radius: 8px;
    background-color: ${(props) => props.theme.background};
    padding: 5px;
    z-index: 3;
    box-shadow: ${({ theme }) => (theme.name === 'light' ? `0px 0px 4px rgba(0, 0, 0, 0.25)` : ``)};
`

export const TimeInputComponent = styled.div`
    overflow: scroll;
    color: ${(props) => props.theme.text};
    height: 100%;
`

export const DropdownItem = styled.div<{ $selected: boolean }>`
    width: 100%;
    height: 30px;
    ${flexCenter({ justifyContent: 'space-between' })};
    padding: 0 10px;
    font-size: 12px;
    border-radius: 8px;
    background-color: ${(props) => (props.$selected ? `${props.theme.active}` : `transparent`)};
    cursor: pointer;

    &:hover {
        background-color: ${(props) => props.theme.hover};
    }

    & > svg {
        height: 16px;
        width: 16px;
        stroke: ${(props) => props.theme.text};
        stroke-width: 3px;
    }
`