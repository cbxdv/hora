import { styled } from 'styled-components'

import { flexCenter } from '@styles/styleDefinitions'

export {
    InputContainer,
    InputName,
    InputValue,
    InputValueArrowContainer,
    BodySectionContainer,
    ActionsContainer,
    ButtonContainer
} from '@styles/formStyles'

export const BlockFormContainer = styled.div`
    height: 100%;
`

export const TitleContainer = styled.div`
    ${flexCenter({ justifyContent: `flex-start` })};
    width: 100%;
    position: relative;
`

export const TitleIconContainer = styled.div`
    ${flexCenter()};
    width: 30px;
    height: 30px;
    background-color: ${props => props.theme.shade1};
    border-radius: 8px;
    cursor: pointer;

    & > svg {
        height: 20px;
        width: 20px;
        fill: none;
        stroke: ${({ theme }) => theme.text};
        stroke-width: 2px;
    }
`

export const TitleInput = styled.input`
    height: 100%;
    width: 100%;
    font-size: 14px;
    font-family: Outfit;
    border: none;
    outline: none;
    background: none;
    color: ${({ theme }) => theme.text};
    padding: 0 14px;
    font-weight: 500;
`

export const TitlePlaceholder = styled.div`
    color: ${({ theme }) => theme.sec};
    position: absolute;
    left: 42px;
    pointer-events: none;
`

export const ColorIndicator = styled.div<{ $color: string }>`
    height: 15px;
    width: 15px;
    border-radius: 4px;
    background: ${props => props.$color};
    margin-right: 10px;
`

export const DescriptionContainer = styled.div`
    ${flexCenter()};
    position: relative;
    border-radius: 8px;
`

export const DescriptionInput = styled.textarea`
    height: 100px;
    width: 100%;
    word-break: break-word;
    outline: none;
    border: none;
    background: ${({ theme }) => theme.shade1};
    border-radius: 8px;
    resize: none;
    font-family: Outfit;
    color: ${({ theme }) => theme.text};
    padding: 20px;
    margin-bottom: 10px;
    position: relative;
`

export const DescriptionPlaceholder = styled.div`
    color: ${({ theme }) => theme.sec};
    position: absolute;
    left: 22px;
    top: 20px;
    pointer-events: none;
`

export const SubjectContainer = styled.div`
    width: 90%;
    position: relative;
    margin: auto;
`
