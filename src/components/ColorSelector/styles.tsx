import { styled } from 'styled-components'
import { flexCenter } from '../../styles/styleUtils'

export const ColorSelectorContainer = styled.div`
    cursor: default;
    position: absolute;
    top: 110%;
    border-radius: 8px;
    background-color: ${(props) => props.theme.background};
    z-index: 1;
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: repeat(5, 1fr);
    right: -10px;
    box-shadow: ${({ theme }) => (theme.name === 'light' ? `0px 0px 4px rgba(0, 0, 0, 0.25)` : ``)};
`

export const ColorButtonContainer = styled.div<{ $selected: boolean }>`
    ${flexCenter()};
    cursor: pointer;
    height: 24px;
    width: 24px;
    border: 2px solid ${(props) => (props.$selected ? `${props.theme.text}` : `transparent`)};
    margin: 5px;
    border-radius: 4px;
`

export const ColorButton = styled.div<{ $color: string }>`
    background: ${(props) => props.$color};
    height: 16px;
    width: 16px;
    border-radius: 4px;
`
