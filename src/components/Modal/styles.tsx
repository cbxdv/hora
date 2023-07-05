import { styled } from 'styled-components'
import { flexCenter } from '../../styles/styleUtils'

export const ModalContainer = styled.div``

export const ModalDrop = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: ${(props) => (props.theme.name === 'dark' ? `rgba(255, 255, 255, 0.05)` : `rgba(0, 0, 0, 0.5)`)};
    backdrop-filter: blur(5px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
`

export const ModalBody = styled.div<{ $height: string; $width: string }>`
    height: ${(props) => props.$height};
    max-height: 90%;
    width: ${(props) => props.$width};
    max-width: 90%;
    padding: 30px;
    margin: auto;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${({ theme }) => theme.background};
`

export const ModalHeader = styled.div<{ $hasTitle?: string }>`
    width: 100%;
    ${flexCenter()};
    justify-content: ${(props) => (props.$hasTitle ? `space-between` : `flex-end`)};
`

export const ModalHeading = styled.h1`
    font-size: 20px;
    color: ${(props) => props.theme.text};
`

export const CloseButton = styled.div`
    cursor: pointer;

    & > svg {
        width: 20px;
        height: 20px;
        fill: none;
        stroke: ${(props) => props.theme.text};
        stroke-width: 2px;
    }
`
export const ModalChild = styled.div`
    width: 100%;
    height: 100%;
    overflow: scroll;
`