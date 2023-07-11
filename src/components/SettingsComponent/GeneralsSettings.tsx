import ThemeSelector from '@components/ThemeSelector'

import { selectAppSettings } from '@redux/selectors/appSelectors'
import { appNotificationsToggled } from '@redux/slices/appSlice'
import { useAppDispatch, useAppSelector } from '@redux/store'

import SettingsCheckBox from './SettingsCheckbox'
import * as s from './styles'

const GeneralSettings = () => {
    const dispatch = useAppDispatch()

    const settings = useAppSelector(selectAppSettings)

    return (
        <s.SettingsComponentItem>
            <s.SettingsSectionContainer>
                <s.SettingsSection>
                    <s.SectionHeading>Theme</s.SectionHeading>
                    <ThemeSelector />
                </s.SettingsSection>
                <s.SettingsSection>
                    <s.SectionHeading>Notifications</s.SectionHeading>
                    <s.SectionBodyGrid>
                        <s.CheckSettingContainer>
                            <s.CheckSettingName>Notifications</s.CheckSettingName>
                            <SettingsCheckBox
                                value={settings.notifications}
                                setValue={() => dispatch(appNotificationsToggled())}
                            />
                        </s.CheckSettingContainer>
                    </s.SectionBodyGrid>
                </s.SettingsSection>
            </s.SettingsSectionContainer>
        </s.SettingsComponentItem>
    )
}

export default GeneralSettings
