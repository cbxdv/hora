import SettingsIcon from '@assets/icons/Settings.svg'
import Logo from '@assets/logo/logo.svg'

import CurrentBlockViewer from '@components/CurrentBlockViewer'
import CurrentTimeViewer from '@components/CurrentTimeViewer'
import IconButton from '@components/IconButton'
import NewBlockButton from '@components/NewBlockButton'

import { showSettings } from '@redux/slices/appSlice'
import { useAppDispatch } from '@redux/store'

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
