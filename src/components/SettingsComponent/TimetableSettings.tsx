import { AnimatePresence } from 'framer-motion'

import { DayID } from '@appTypes/TimeBlockInterfaces'
import { TTNotifyType } from '@appTypes/TimetableInterfaces'

import { ReactComponent as TrashIcon } from '@assets/icons/Trash.svg'

import TextButton from '@components/TextButton'

import { selectTTAllocations, selectTTSettings } from '@redux/selectors/timetableSelectors'
import {
    ttBlocksCleared,
    ttDayToShowToggled,
    ttNotificationToggled,
    ttNotifyBeforeUpdated,
    ttShowCurrentBlockToggled,
    ttShowCurrentTimeToggled,
    ttSubDayDeleted
} from '@redux/slices/timetableSlice'
import { useAppSelector, useAppDispatch } from '@redux/store'

import { dayIds, shouldShowSubsInSettings } from '@utils/timetableUtils'

import SettingsCheckBox from './SettingsCheckbox'
import SettingsNumberInput from './SettingsNumberInput'

import * as s from './styles'

const TimetableSettings = () => {
    const dispatch = useAppDispatch()

    const settings = useAppSelector(selectTTSettings)
    const allocations = useAppSelector(selectTTAllocations)

    const shouldShowSubs = shouldShowSubsInSettings(allocations.subDays)

    return (
        <s.SettingsComponentItem>
            <s.SettingsSection>
                <s.SectionHeading>Header Settings</s.SectionHeading>
                <s.SectionBodyGrid>
                    <s.CheckSettingContainer>
                        <s.CheckSettingName>Show current time</s.CheckSettingName>
                        <SettingsCheckBox
                            value={settings.showCurrentTimeInHeader}
                            setValue={() => dispatch(ttShowCurrentTimeToggled())}
                        />
                    </s.CheckSettingContainer>
                    <s.CheckSettingContainer>
                        <s.CheckSettingName>Show header block</s.CheckSettingName>
                        <SettingsCheckBox
                            value={settings.showCurrentBlockInHeader}
                            setValue={() => dispatch(ttShowCurrentBlockToggled())}
                        />
                    </s.CheckSettingContainer>
                </s.SectionBodyGrid>
            </s.SettingsSection>
            <s.SettingsSection>
                <s.SectionHeading>Days to Show</s.SectionHeading>
                <s.SectionBodyGrid>
                    {dayIds.map(dayId => (
                        <s.CheckSettingContainer key={`${dayId}-dayToShow`}>
                            <s.CheckSettingName>{DayID[dayId]}</s.CheckSettingName>
                            <SettingsCheckBox
                                value={settings.daysToShow[dayId]}
                                setValue={() => dispatch(ttDayToShowToggled(dayId))}
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
                            setValue={() => dispatch(ttNotificationToggled(TTNotifyType.Start))}
                        />
                    </s.CheckSettingContainer>
                    <s.CheckSettingContainer>
                        Notify before{` `}
                        <SettingsNumberInput
                            value={settings.notifyStartBefore}
                            setValue={value => {
                                dispatch(ttNotifyBeforeUpdated({ type: TTNotifyType.Start, value }))
                            }}
                        />
                        {` `}
                        mins
                    </s.CheckSettingContainer>
                    <s.CheckSettingContainer>
                        <s.CheckSettingName>Notify at end</s.CheckSettingName>
                        <SettingsCheckBox
                            value={settings.notifyEnd}
                            setValue={() => dispatch(ttNotificationToggled(TTNotifyType.End))}
                        />
                    </s.CheckSettingContainer>
                    <s.CheckSettingContainer>
                        Notify before{` `}
                        <SettingsNumberInput
                            value={settings.notifyEndBefore}
                            setValue={value => {
                                dispatch(ttNotifyBeforeUpdated({ type: TTNotifyType.End, value }))
                            }}
                        />
                        {` `}
                        mins
                    </s.CheckSettingContainer>
                </s.SectionBodyGrid>
            </s.SettingsSection>
            <AnimatePresence>
                {shouldShowSubs && (
                    <s.SettingsSection>
                        <s.SectionHeading>Substitutions</s.SectionHeading>
                        <s.SubsContainer>
                            <AnimatePresence>
                                {dayIds.map(dayId => {
                                    const subDay = allocations.subDays[dayId]
                                    if (subDay.subWith !== null) {
                                        return (
                                            <s.SubElement key={dayId}>
                                                <s.SubElementDetails>
                                                    <div>{DayID[dayId]}</div>
                                                    <div>&larr;</div>
                                                    <div>{DayID[subDay.subWith]}</div>
                                                </s.SubElementDetails>
                                                <s.SubElementAction onClick={() => dispatch(ttSubDayDeleted(dayId))}>
                                                    <TrashIcon />
                                                </s.SubElementAction>
                                            </s.SubElement>
                                        )
                                    }
                                })}
                            </AnimatePresence>
                        </s.SubsContainer>
                    </s.SettingsSection>
                )}
            </AnimatePresence>
            <s.SettingsSection>
                <s.SectionHeading>Danger Zone</s.SectionHeading>
                <s.DangerMiddle>
                    <TextButton text='Clear all Blocks' danger onClick={() => dispatch(ttBlocksCleared())} />
                </s.DangerMiddle>
            </s.SettingsSection>
        </s.SettingsComponentItem>
    )
}

export default TimetableSettings
