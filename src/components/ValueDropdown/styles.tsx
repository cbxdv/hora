import { styled } from 'styled-components'
import { flexCenter } from '../../styles/styleUtils'

export const ValueDropdownContainer = styled.div`
    width: 100%;
    position: absolute;
    left: 0;
    top: 110%;
    border-radius: 8px;
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.text};
    font-size: 13px;
    padding: 5px;
    z-index: 1;
    height: 150px;
    overflow: scroll;
    box-shadow: ${({ theme }) => (theme.name === 'light' ? `0px 0px 4px rgba(0, 0, 0, 0.25)` : ``)};
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
