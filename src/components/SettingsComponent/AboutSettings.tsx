import Octocat from '@assets/icons/Octocat.png'
import LogoIcon from '@assets/logo/logo.svg'
import LogoText from '@assets/logo/text.svg'

import { selectAppVersion } from '@redux/selectors/appSelectors'
import { useAppSelector } from '@redux/store'

import * as s from './styles'

const AboutSettings = () => {
    const version = useAppSelector(selectAppVersion)
    return (
        <s.SettingsComponentItem>
            <s.AboutContainer>
                <s.LogoContainer>
                    <s.LogoIconContainer>
                        <LogoIcon />
                    </s.LogoIconContainer>
                    <s.LogoTextContainer>
                        <LogoText />
                    </s.LogoTextContainer>
                </s.LogoContainer>
                <s.AboutText>Version: {version}</s.AboutText>
                {/* This is done so that the link opens in the default browser rarer than the 
                electron app itself. Uses Electron's `shell.openExternal` to open link. */}
                <s.AboutLink onClick={api.openRepoLink}>
                    <img src={Octocat} />
                    GitHub
                </s.AboutLink>
            </s.AboutContainer>
        </s.SettingsComponentItem>
    )
}

export default AboutSettings
