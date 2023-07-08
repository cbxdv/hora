import { DayID } from '@appTypes/TimeBlockInterfaces'

import TrashIcon from '@assets/icons/Trash.svg'

import TextButton from '@components/TextButton'

import {
    blocksCleared,
    selectTimetableSettings,
    toggleDaysToShow,
    toggleTTNotification,
    updateTTNotifyBefore,
    selectTTAllocations,
    ttDaySubDeleted
} from '@redux/slices/timetableSlice'
import { useAppSelector, useAppDispatch } from '@redux/store'

import { dayIds, shouldShowSubsInSettings } from '@utils/timetableUtils'

import SettingsCheckBox from './SettingsCheckbox'
import SettingsNumberInput from './SettingsNumberInput'

import * as s from './styles'
import { AnimatePresence } from 'framer-motion'

const TimetableSettings = () => {
    const dispatch = useAppDispatch()

    const settings = useAppSelector(selectTimetableSettings)
    const allocations = useAppSelector(selectTTAllocations)

    const shouldShowSubs = shouldShowSubsInSettings(allocations.daySubs)

    return (
        <s.SettingsComponentItem>
            <s.SettingsSection>
                <s.SectionHeading>Days to Show</s.SectionHeading>
                <s.SectionBodyGrid>
                    {dayIds.map(dayId => (
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
                            setValue={() => dispatch(toggleTTNotification(`start`))}
                        />
                    </s.CheckSettingContainer>
                    <s.CheckSettingContainer>
                        Notify before{` `}
                        <SettingsNumberInput
                            value={settings.notifyStartBefore}
                            setValue={value => {
                                dispatch(updateTTNotifyBefore({ type: `start`, value }))
                            }}
                        />
                        {` `}
                        mins
                    </s.CheckSettingContainer>
                    <s.CheckSettingContainer>
                        <s.CheckSettingName>Notify at end</s.CheckSettingName>
                        <SettingsCheckBox
                            value={settings.notifyEnd}
                            setValue={() => dispatch(toggleTTNotification(`end`))}
                        />
                    </s.CheckSettingContainer>
                    <s.CheckSettingContainer>
                        Notify before{` `}
                        <SettingsNumberInput
                            value={settings.notifyEndBefore}
                            setValue={value => {
                                dispatch(updateTTNotifyBefore({ type: `end`, value }))
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
                                    const daySub = allocations.daySubs[dayId]
                                    if (daySub.subWith !== null) {
                                        return (
                                            <s.SubElement key={dayId}>
                                                <s.SubElementDetails>
                                                    <div>{DayID[dayId]}</div>
                                                    <div>&larr;</div>
                                                    <div>{DayID[daySub.subWith]}</div>
                                                </s.SubElementDetails>
                                                <s.SubElementAction onClick={() => dispatch(ttDaySubDeleted(dayId))}>
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
                    <TextButton text='Clear all Blocks' danger onClick={() => dispatch(blocksCleared())} />
                </s.DangerMiddle>
            </s.SettingsSection>
        </s.SettingsComponentItem>
    )
}

export default TimetableSettings
