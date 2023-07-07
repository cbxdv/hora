import ThemeSelector from '@components/ThemeSelector'

import {
    selectAppSettings,
    toggleMinimizeOnClose,
    toggleNotifications,
    toggleOpenAtStartup,
    toggleOpenMinimized
} from '@redux/slices/appSlice'
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
                    <s.SectionHeading>Window Settings</s.SectionHeading>
                    <s.SectionBodyGrid>
                        <s.CheckSettingContainer>
                            <s.CheckSettingName>Minimize on close</s.CheckSettingName>
                            <SettingsCheckBox
                                value={settings.minimizeOnClose}
                                setValue={() => dispatch(toggleMinimizeOnClose())}
                            />
                        </s.CheckSettingContainer>
                        <s.CheckSettingContainer>
                            <s.CheckSettingName>Open on startup</s.CheckSettingName>
                            <SettingsCheckBox
                                value={settings.openAtStartup}
                                setValue={() => dispatch(toggleOpenAtStartup())}
                            />
                        </s.CheckSettingContainer>
                        <s.CheckSettingContainer>
                            <s.CheckSettingName>Open minimized</s.CheckSettingName>
                            <SettingsCheckBox
                                value={settings.openMinimized}
                                setValue={() => dispatch(toggleOpenMinimized())}
                            />
                        </s.CheckSettingContainer>
                    </s.SectionBodyGrid>
                </s.SettingsSection>
                <s.SettingsSection>
                    <s.SectionHeading>Notifications</s.SectionHeading>
                    <s.SectionBodyGrid>
                        <s.CheckSettingContainer>
                            <s.CheckSettingName>Notifications</s.CheckSettingName>
                            <SettingsCheckBox
                                value={settings.notifications}
                                setValue={() => dispatch(toggleNotifications())}
                            />
                        </s.CheckSettingContainer>
                    </s.SectionBodyGrid>
                </s.SettingsSection>
            </s.SettingsSectionContainer>
        </s.SettingsComponentItem>
    )
}

export default GeneralSettings
