import { styled } from 'styled-components'
import { flexCenter, subtleBorder } from '../../styles/styleUtils'

export const BlockFormContainer = styled.div`
    height: 100%;
`

export const TitleContainer = styled.div`
    ${flexCenter({ justifyContent: 'flex-start' })};
    width: 100%;
    position: relative;
`

export const TitleIconContainer = styled.div`
    ${flexCenter()};
    width: 30px;
    height: 30px;
    background-color: ${(props) => props.theme.shade1};
    border-radius: 8px;

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

export const BodySectionContainer = styled.div`
    background-color: ${({ theme }) => theme.shade1};
    border-radius: 8px;
    margin: 10px 0;
`

export const InputContainer = styled.div`
    ${flexCenter({ justifyContent: 'space-between' })};
    width: 330px;
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
    ${flexCenter({ justifyContent: 'space-between' })};
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
        transform: ${(props) => (props.$isVisible ? `rotate(180deg) translateY(-2px)` : `translateY(1px)`)};
        pointer-events: none;
        height: 14px;
        width: 14px;
        fill: none;
        stroke: ${({ theme }) => theme.text};
        stroke-width: 2px;
    }
`

export const DropdownItem = styled.div<{ $selected: boolean }>`
    width: 100%;
    height: 30px;
    ${flexCenter({ justifyContent: 'space-between' })};
    padding: 0 10px;
    font-size: 12px;
    border-radius: 8px;
    background-color: ${(props) => (props.$selected ? `${props.theme.hover}` : `transparent`)};

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

export const ColorIndicator = styled.div<{ $color: string }>`
    height: 15px;
    width: 15px;
    border-radius: 4px;
    background: ${(props) => props.$color};
    margin-right: 10px;
`

export const DescriptionContainer = styled.div`
    ${flexCenter()};
    position: relative;
    border-radius: 8px;
`

export const DescriptionInput = styled.textarea`
    height: 100px;
    width: 330px;
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
    left: 20px;
    top: 20px;
    font-size: 13px;
    pointer-events: none;
`

export const ActionsContainer = styled.div`
    width: 100%;
    ${flexCenter({ justifyContent: 'space-between' })};
    align-content: stretch;
`

export const ButtonContainer = styled.div`
    width: 100%;
    padding: 0 5px;

    & > button {
        width: 100%;
    }
`
