import { motion } from 'framer-motion'
import { styled } from 'styled-components'

import { flexCenter, subtleBorder } from '@styles/styleDefinitions'

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
    overflow: scroll;
`

export const BlockFormMain = styled.div``

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

        & > path {
            stroke: ${({ theme }) => theme.text};
            stroke-width: 2px;
        }
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

export const AdditionalsButton = styled(motion.button).attrs(() => ({
    whileHover: { scale: 0.99 },
    whileTap: { scale: 0.98 }
}))`
    border: none;
    outline: none;
    ${flexCenter()};
    height: 30px;
    background-color: ${({ theme }) => theme.shade1};
    color: ${({ theme }) => theme.sec};
    font-size: 12px;
    font-weight: 500;
    border-radius: 8px;
    cursor: pointer;
    scale: 1;
    width: 100%;
    border: 1px dashed ${({ theme }) => theme.sec};
`

export const AdditionalsButtonContainer = styled.div`
    width: 100%;
    padding: 20px;
`

export const AdditionalsComponentContainer = styled(motion.div).attrs(() => ({
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
}))`
    ${flexCenter({ justifyContent: `space-between` })};
    width: 350px;
    padding: 20px 20px 0 20px;
`

export const AdditionalsName = styled.input`
    width: 45%;
    color: ${({ theme }) => theme.text};
    font-weight: 500;
    font-family: Outfit;
    background: ${({ theme }) => theme.shade2};
    height: 30px;
    border-radius: 8px;
    ${flexCenter({ justifyContent: `space-between` })};
    font-size: 13px;
    padding: 5px 10px;
    position: relative;
    ${subtleBorder}
    outline: none;
`

export const AdditionalsValue = styled.input`
    background: ${({ theme }) => theme.shade2};
    width: 45%;
    height: 30px;
    border-radius: 8px;
    ${flexCenter({ justifyContent: `space-between` })};
    font-size: 13px;
    padding: 5px 10px;
    position: relative;
    ${subtleBorder};
    font-family: Outfit;
    outline: none;
    color: ${({ theme }) => theme.text};
`

export const AdditionalsTrashContainer = styled.div`
    ${flexCenter()};
    width: 4%;
    cursor: pointer;

    & > svg {
        ${flexCenter()};
        width: 12px;
        height: 12px;

        & > path {
            stroke: #ff9596;
            stroke-width: 2px;
        }
    }
`
