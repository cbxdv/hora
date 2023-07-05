import styled from 'styled-components'
import { flexCenter } from '../../styles/styleDefinitions'

export const LogoContainer = styled.div`
    height: 40px;
    width: 40px;
`

export const HeaderContainer = styled.div`
    ${flexCenter({ justifyContent: 'space-between' })};
    background-color: ${(props) => props.theme.background};
    height: 90px;
    width: 100%;
    padding: 10px 60px;
    position: fixed;
    top: 0;
    z-index: 1;
`

export const DetailsContainer = styled.div`
    ${flexCenter({ justifyContent: 'space-between' })};
`

export const ActionsContainer = styled.div`
    ${flexCenter({ justifyContent: 'space-between' })};
    width: 175px;
`
