import { useEffect, ReactNode, MouseEvent } from 'react'
import { createPortal } from 'react-dom'

import CrossIcon from '@assets/icons/Cross.svg'

import * as s from './styles'

const Modal: React.FC<ModalProps> = ({ title, children, closeHandler, height, width }) => {
    const keyBindHandler = (event: KeyboardEvent) => {
        event.stopPropagation()
        if (event.key === `Escape`) {
            closeHandler()
        }
    }

    useEffect(() => {
        window.addEventListener(`keydown`, keyBindHandler)
        return () => {
            window.removeEventListener(`keydown`, keyBindHandler)
        }
    }, [])

    return createPortal(
        <s.ModalContainer>
            <s.ModalDrop onClick={closeHandler}>
                <s.ModalBody
                    $height={height}
                    $width={width}
                    onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}
                >
                    <s.ModalHeader $hasTitle={title}>
                        {title ? <s.ModalHeading>{title}</s.ModalHeading> : <></>}
                        <s.CloseButton onClick={closeHandler}>
                            <CrossIcon />
                        </s.CloseButton>
                    </s.ModalHeader>
                    <s.ModalChild>{children}</s.ModalChild>
                </s.ModalBody>
            </s.ModalDrop>
        </s.ModalContainer>,
        document.getElementById(`modal`) as Element
    )
}

type ModalProps = {
    title?: string
    children?: ReactNode
    closeHandler: () => void
    height?: string
    width?: string
}

Modal.defaultProps = {
    height: `unset`,
    width: `unset`
}

export default Modal
