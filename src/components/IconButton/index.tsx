import * as s from './styles'

const IconButton: React.FC<IconButtonProps> = ({ Icon, text, onClick }) => (
    <s.IconButtonContainer onClick={onClick}>
        <s.IconContainer>
            <Icon />
        </s.IconContainer>
        {text && <s.TextContainer>{text}</s.TextContainer>}
    </s.IconButtonContainer>
)

type IconButtonProps = {
    Icon: React.FunctionComponent
    text?: string
    onClick: () => void
}

export default IconButton
