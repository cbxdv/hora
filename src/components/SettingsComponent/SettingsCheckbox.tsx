import CheckIcon from '../../assets/icons/Check.svg'
import * as s from './styles'

const SettingsCheckBox: React.FC<SettingsCheckBoxProps> = ({ value, setValue }) => {
    return <s.CheckBoxContainer onClick={setValue}>{value ? <CheckIcon /> : <></>}</s.CheckBoxContainer>
}

type SettingsCheckBoxProps = {
    value: boolean
    setValue: () => void
}

export default SettingsCheckBox
