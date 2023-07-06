import { useAppSelector, useAppDispatch } from '../../redux/store'
import SettingsCheckBox from './SettingsCheckbox'
import SettingsNumberInput from './SettingsNumberInput'
import {
    blocksCleared,
    selectTimetableSettings,
    toggleDaysToShow,
    toggleTTNotification,
    updateTTNotifyBefore
} from '../../redux/slices/timetableSlice'
import { DayID } from '../../@types/TimeBlockInterfaces'
import TextButton from '../TextButton'
import * as s from './styles'

const TimetableSettings = () => {
    const dispatch = useAppDispatch()

    const settings = useAppSelector(selectTimetableSettings)
    const dayIds: DayID[] = [1, 2, 3, 4, 5, 6, 0]

    return (
        <s.SettingsComponentItem>
            <s.SettingsSection>
                <s.SectionHeading>Days to Show</s.SectionHeading>
                <s.SectionBodyGrid>
                    {dayIds.map((dayId) => (
                        <s.CheckSettingContainer key={`${dayId}-dayToShow`}>
                            <s.CheckSettingName>{DayID[dayId]}</s.CheckSettingName>
                            <SettingsCheckBox
                                value={settings.daysToShow[dayId]}
                                setValue={() => dispatch(toggleDaysToShow(dayId))}
                            />
                        </s.CheckSettingContainer>
                    ))}
                </s.SectionBodyGrid>
            </s.SettingsSection>
            <s.SettingsSection>
                <s.SectionHeading>Notifications</s.SectionHeading>
                <s.SectionBodyGrid>
                    <s.CheckSettingContainer>
                        <s.CheckSettingName>Notify at start</s.CheckSettingName>
                        <SettingsCheckBox
                            value={settings.notifyStart}
                            setValue={() => dispatch(toggleTTNotification('start'))}
                        />
                    </s.CheckSettingContainer>
                    <s.CheckSettingContainer>
                        Notify before{' '}
                        <SettingsNumberInput
                            value={settings.notifyStartBefore}
                            setValue={(value) => {
                                dispatch(updateTTNotifyBefore({ type: 'start', value }))
                            }}
                        />{' '}
                        mins
                    </s.CheckSettingContainer>
                    <s.CheckSettingContainer>
                        <s.CheckSettingName>Notify at end</s.CheckSettingName>
                        <SettingsCheckBox
                            value={settings.notifyEnd}
                            setValue={() => dispatch(toggleTTNotification('end'))}
                        />
                    </s.CheckSettingContainer>
                    <s.CheckSettingContainer>
                        Notify before{' '}
                        <SettingsNumberInput
                            value={settings.notifyEndBefore}
                            setValue={(value) => {
                                dispatch(updateTTNotifyBefore({ type: 'end', value }))
                            }}
                        />{' '}
                        mins
                    </s.CheckSettingContainer>
                </s.SectionBodyGrid>
            </s.SettingsSection>
            <s.SettingsSection>
                <s.SectionHeading>Danger Zone</s.SectionHeading>
                <s.DangerMiddle>
                    <TextButton text='Clear all Blocks' danger onClick={() => dispatch(blocksCleared())} />
                </s.DangerMiddle>
            </s.SettingsSection>
        </s.SettingsComponentItem>
    )
}

export default TimetableSettings
