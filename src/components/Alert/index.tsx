import Modal from '@components/Modal'
import TextButton from '@components/TextButton'

import * as s from './styles'

const Alert: React.FC<ConfirmationDialogProps> = ({ title, description, acceptText, rejectText, action }) => {
    return (
        <Modal closeHandler={() => action(false)} title={title} hideCloseButton>
            <s.AlertContainer>
                {description}
                <s.ButtonsContainer>
                    <s.ButtonContainer $marginRight>
                        <TextButton text={rejectText} onClick={() => action(false)} />
                    </s.ButtonContainer>
                    <s.ButtonContainer $marginLeft>
                        <TextButton text={acceptText} onClick={() => action(true)} danger />
                    </s.ButtonContainer>
                </s.ButtonsContainer>
            </s.AlertContainer>
        </Modal>
    )
}

type ConfirmationDialogProps = {
    title: string
    description: string
    acceptText: string
    rejectText: string
    action: (response: boolean) => void
    closeHandler: () => void
}

export default Alert
