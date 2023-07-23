import { AnimatePresence } from 'framer-motion'
import { useState, MouseEvent, useRef } from 'react'

import { DayID, ITime } from '@appTypes/TimeBlockInterfaces'

import BlockAddIcon from '@assets/icons/BoxAdd.svg'
import HideIcon from '@assets/icons/EyeSlash.svg'
import SubstituteIcon from '@assets/icons/Substitute.svg'

import ContextMenu, { ContextMenuItemType } from '@components/ContextMenu'
import CurrentTimeLine from '@components/CurrentTimeLine'
import TimeBlock from '@components/TimeBlock'

import useContextMenu from '@hooks/useContextMenu'

import { selectTTBlocksByDay, selectTTDayToSub, selectTTFormCacheDuration } from '@redux/selectors/timetableSelectors'
import {
    ttBlockFormedOpened,
    ttDayToOpenSubFormUpdated,
    ttDayToShowToggled,
    ttFormCacheDayUpdated,
    ttFormCacheTimeUpdated,
    ttSubDayDeleted,
    ttSubDayToOpenBlockFormUpdated,
    ttSubFormOpened
} from '@redux/slices/timetableSlice'
import { useAppDispatch, useAppSelector } from '@redux/store'

import { addDurationToTimeLimited } from '@utils/timeUtils'

import * as s from './styles'

const DayColumn: React.FC<DayColumnProps> = ({ dayId }) => {
    const dispatch = useAppDispatch()

    const blocksContainerRef = useRef<HTMLDivElement>(null)

    let blocks = useAppSelector(state => selectTTBlocksByDay(state, dayId))
    const dayToSub = useAppSelector(state => selectTTDayToSub(state, dayId))
    const duration = useAppSelector(selectTTFormCacheDuration)

    if (dayToSub.subWith !== null) {
        blocks = dayToSub.blocks
    }

    const contextMenuHandler = (event: MouseEvent) => {
        // Calculates the time based on the position of the mouse click
        if (blocksContainerRef && blocksContainerRef.current) {
            const rect = blocksContainerRef.current.getBoundingClientRect()
            const y = Math.floor(event.clientY - rect.top)
            const hours = Math.floor(y / 90)
            const minutes = Math.floor((y % 90) / 1.5)
            if (hours >= 0 && minutes >= 0 && hours < 24 && minutes < 60) {
                setContextTime({ hours, minutes, seconds: 0, day: dayId })
            }
        }
    }

    const { isContextMenuVisible, showContextMenu, hideContextMenu, mousePos } = useContextMenu({
        onContextMenu: contextMenuHandler
    })

    const [contextTime, setContextTime] = useState<ITime | null>(null)

    const newBlockHandler = () => {
        if (dayToSub.subWith == null) {
            dispatch(ttFormCacheDayUpdated(dayId))
        } else {
            dispatch(ttSubDayToOpenBlockFormUpdated(dayId))
        }
        if (contextTime != null) {
            const addedTime = addDurationToTimeLimited(contextTime, duration)
            dispatch(
                ttFormCacheTimeUpdated({
                    startTime: contextTime,
                    endTime: addedTime
                })
            )
        }
    }

    const contextMenuItems: ContextMenuItemType[] = [
        {
            id: `add-new`,
            label: `Add new`,
            icon: BlockAddIcon,
            action() {
                newBlockHandler()
                dispatch(ttBlockFormedOpened())
            }
        },
        {
            id: `hide`,
            label: `Hide day`,
            icon: HideIcon,
            action() {
                dispatch(ttDayToShowToggled(dayId))
            }
        },
        {
            id: `sub-day`,
            label: dayToSub.subWith == null ? `Substitute day` : `Remove Substitute`,
            icon: SubstituteIcon,
            action() {
                if (dayToSub.subWith == null) {
                    dispatch(ttDayToOpenSubFormUpdated(dayId))
                    dispatch(ttSubFormOpened())
                } else {
                    dispatch(ttSubDayDeleted(dayId))
                }
            }
        }
    ]

    return (
        <>
            <AnimatePresence>
                {isContextMenuVisible && (
                    <ContextMenu menuItems={contextMenuItems} position={mousePos} closeHandler={hideContextMenu} />
                )}
            </AnimatePresence>
            <s.DayColumnContainer $dayId={dayId} onAuxClick={showContextMenu}>
                <s.DayIndicator $today={dayId === new Date().getDay()}>
                    {dayToSub.subWith != null ? (
                        <>
                            <div>{DayID[dayId]}</div>
                            <s.SubsIndicatorText>&nbsp; &larr; &nbsp;</s.SubsIndicatorText>
                            <s.SubsIndicatorText>{DayID[dayToSub.subWith]}</s.SubsIndicatorText>
                        </>
                    ) : (
                        <>{DayID[dayId]}</>
                    )}
                </s.DayIndicator>
                <s.BlocksContainer ref={blocksContainerRef}>
                    <AnimatePresence>
                        {blocks.map(block => (
                            <TimeBlock
                                key={block.id}
                                timeBlock={block}
                                subDay={dayToSub.subWith != null ? dayId : null}
                            />
                        ))}
                    </AnimatePresence>
                    {new Date().getDay() === dayId && <CurrentTimeLine />}
                </s.BlocksContainer>
            </s.DayColumnContainer>
        </>
    )
}

type DayColumnProps = {
    dayId: DayID
}

export default DayColumn
