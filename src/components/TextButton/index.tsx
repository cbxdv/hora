import styled from 'styled-components'
import { buttonStyles } from '../../styles/styleUtils'

const TextButton: React.FC<TextButtonProps> = ({ text, onClick, danger }) => {
    return (
        <TextButtonContainer $danger={danger} onClick={onClick}>
            {text}
        </TextButtonContainer>
    )
}

type TextButtonProps = {
    text: string
    onClick?: () => void
    danger?: boolean
}

TextButton.defaultProps = {
    onClick: () => null,
    danger: false
}

const TextButtonContainer = styled.button<{ $danger?: boolean }>`
    ${(props) => buttonStyles(props.$danger)}
`

export default TextButton
