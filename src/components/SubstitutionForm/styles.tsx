import styled from 'styled-components'

import { flexCenter, subtleBorder } from '@styles/styleDefinitions'

export const InputContainer = styled.div`
    ${flexCenter({ justifyContent: `space-between` })};
    width: 350px;
    padding: 20px;
`

export const InputName = styled.div`
    width: 30%;
    color: ${({ theme }) => theme.sec};
    font-weight: 500;
    font-size: 13px;
`

export const InputValue = styled.div`
    background: ${({ theme }) => theme.shade2};
    width: 140px;
    height: 30px;
    border-radius: 8px;
    ${flexCenter({ justifyContent: `space-between` })};
    font-size: 13px;
    padding: 5px 10px;
    position: relative;
    ${subtleBorder}
`

export const InputValueArrowContainer = styled.button<{ $isVisible: boolean }>`
    cursor: pointer;
    outline: none;
    border: none;
    background: transparent;
    position: relative;

    & > svg {
        transform: ${props => (props.$isVisible ? `rotate(180deg) translateY(-2px)` : `translateY(1px)`)};
        pointer-events: none;
        height: 14px;
        width: 14px;
        fill: none;
        stroke: ${({ theme }) => theme.text};
        stroke-width: 2px;
    }
`

export const BodySectionContainer = styled.div`
    background-color: ${({ theme }) => theme.shade1};
    border-radius: 8px;
    margin: 10px 0;
`

export const ActionsContainer = styled.div`
    width: 100%;
    ${flexCenter({ justifyContent: `space-between` })};
    align-content: stretch;
`

export const ButtonContainer = styled.div`
    width: 100%;
    padding: 0 5px;
    margin-top: 10px;

    & > button {
        width: 100%;
    }
`
