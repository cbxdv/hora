import * as s from './styles'

const IconButton: React.FC<IconButtonProps> = ({ Icon, size, onClick }) => (
    <s.IconButtonContainer $size={size} onClick={onClick}>
        <s.IconContainer>
            <Icon />
        </s.IconContainer>
    </s.IconButtonContainer>
)

type IconButtonProps = {
    Icon: React.FunctionComponent
    size: number
    onClick: () => void
}

IconButton.defaultProps = {
    size: 30
}

export default IconButton
