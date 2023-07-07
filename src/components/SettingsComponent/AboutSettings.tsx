import Octocat from '@assets/icons/Octocat.png'
import LogoIcon from '@assets/logo/logo.svg'
import LogoText from '@assets/logo/text.svg'

import { selectVersion } from '@redux/slices/appSlice'
import { useAppSelector } from '@redux/store'

import * as s from './styles'

const AboutSettings = () => {
    const version = useAppSelector(selectVersion)
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
                <s.AboutLink onClick={api.openRepoLink}>
                    <img src={Octocat} />
                    GitHub
                </s.AboutLink>
            </s.AboutContainer>
        </s.SettingsComponentItem>
    )
}

export default AboutSettings
