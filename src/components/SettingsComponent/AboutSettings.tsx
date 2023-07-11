import Octocat from '@assets/icons/Octocat.png'
import { ReactComponent as LogoIcon } from '@assets/logo/logo.svg'
import { ReactComponent as LogoText } from '@assets/logo/text.svg'

import packageJson from '../../../package.json'

import * as s from './styles'

const AboutSettings = () => {
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
                <s.AboutText>Version: {packageJson.version}</s.AboutText>
                <s.AboutLink href={packageJson.repository.url || ``} target='_blank'>
                    <img src={Octocat} />
                    GitHub
                </s.AboutLink>
            </s.AboutContainer>
        </s.SettingsComponentItem>
    )
}

export default AboutSettings
