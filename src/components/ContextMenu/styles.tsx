import { styled } from 'styled-components'
import { flexCenter } from '../../styles/styleUtils'

export const ContextMenuContainer = styled.div<{ $x: number; $y: number }>`
    min-width: 120px;
    position: fixed;
    background: ${(props) => props.theme.contextBackground};
    box-shadow: ${({ theme }) => (theme.name === 'light' ? `0px 0px 4px rgba(0, 0, 0, 0.25)` : ``)};
    backdrop-filter: blur(4px);
    border-radius: 8px;
    padding: 5px;
    padding-bottom: 0;
    top: ${(props) => props.$y}px;
    left: ${(props) => props.$x}px;
`

export const MenuItem = styled.div<{ $danger?: boolean }>`
    ${flexCenter({ justifyContent: 'flex-start' })};
    width: 100%;
    padding: 5px 10px;
    background: transparent;
    border-radius: 8px;
    color: ${(props) => (props.$danger ? `#C76162` : props.theme.text)};
    font-size: 14px;
    margin-bottom: 5px;
    border: 0.1px solid transparent;

    &:hover {
        border-color: ${(props) => (props.theme.name === 'light' ? `rgba(0, 0, 0, 0.1)` : `rgba(255, 255, 255, 0.2)`)};
    }

    &:active {
        opacity: 0.8;
    }
`

export const MenuItemIcon = styled.div<{ $danger?: boolean }>`
    margin-right: 10px;
    ${flexCenter()};

    & > svg {
        height: 16px;
        width: 16px;
        fill: none;
        stroke: ${({ theme, $danger }) => ($danger ? `#C76162` : theme.text)};
        stroke-width: 2px;
    }
`
