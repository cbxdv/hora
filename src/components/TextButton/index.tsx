import * as s from './styles'

const TextButton: React.FC<TextButtonProps> = ({ text, onClick, danger }) => {
    return (
        <s.TextButtonContainer $danger={danger} onClick={onClick}>
            {text}
        </s.TextButtonContainer>
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

export default TextButton
