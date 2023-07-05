import CurrentTimeViewer from '../CurrentTimeViewer'
import CurrentBlockViewer from '../CurrentBlockViewer'
import NewBlockButton from '../NewBlockButton'
import IconButton from '../IconButton'
import Logo from '../../assets/logo/logo.svg'
import SettingsIcon from '../../assets/icons/Settings.svg'
import { useAppDispatch } from '../../redux/store'
import { showSettings } from '../../redux/slices/appSlice'
import * as s from './styles'

const Header = () => {
    const dispatch = useAppDispatch()

    return (
        <s.HeaderContainer>
            <s.LogoContainer>
                <Logo />
            </s.LogoContainer>
            <s.DetailsContainer>
                <CurrentTimeViewer />
                <CurrentBlockViewer />
            </s.DetailsContainer>
            <s.ActionsContainer>
                <NewBlockButton />
                <IconButton Icon={SettingsIcon} size={36} onClick={() => dispatch(showSettings())} />
            </s.ActionsContainer>
        </s.HeaderContainer>
    )
}

export default Header
