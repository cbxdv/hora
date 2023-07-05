import styled from 'styled-components'
import { flexCenter } from '../../styles/styleUtils'

export const ThemeSelectorContainer = styled.div`
    width: 100%;
    ${flexCenter()};
    padding: 5px 0;
    margin-bottom: 5px;
`

export const ThemeButton = styled.div<{ $selected?: boolean }>`
    width: 90px;
    border-radius: 8px;
    margin: 0 10px;
    font-size: 12px;
    text-align: center;
    cursor: pointer;
    transition: 0.1s transform linear;
    position: relative;

    &:active {
        transform: scale(0.96);
    }
`

export const ThemeButtonImage = styled.div`
    position: relative;
`

export const ThemeImageSelected = styled.div`
    position: absolute;
    top: 0;
    left: 0;
`

export const ThemeButtonText = styled.div`
    margin-top: 2px;
`
