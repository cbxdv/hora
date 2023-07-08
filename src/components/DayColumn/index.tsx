import { AnimatePresence } from 'framer-motion'
import { useState, MouseEvent } from 'react'

import { DayID } from '@appTypes/TimeBlockInterfaces'

import BlockAddIcon from '@assets/icons/BoxAdd.svg'
import HideIcon from '@assets/icons/EyeSlash.svg'
import SubstituteIcon from '@assets/icons/Substitute.svg'

import ContextMenu from '@components/ContextMenu'
import CurrentTimeLine from '@components/CurrentTimeLine'
import TimeBlock from '@components/TimeBlock'

import {
    selectBlocksByDayId,
    selectDayToSub,
    showBlockForm,
    showSubstitutionForm,
    toggleDaysToShow,
    ttDaySubDeleted,
    updateDayToOpenSubForm,
    updateSubDayToOpenBlockForm,
    updateTTFormCacheDay
} from '@redux/slices/timetableSlice'
import { useAppDispatch, useAppSelector } from '@redux/store'

import * as s from './styles'

const DayColumn: React.FC<DayColumnProps> = ({ dayId }) => {
    const dispatch = useAppDispatch()

    let blocks = useAppSelector(state => selectBlocksByDayId(state, dayId))
    const dayToSub = useAppSelector(state => selectDayToSub(state, dayId))

    if (dayToSub.subWith !== null) {
        blocks = dayToSub.blocks
    }

    const [isContextMenuVisible, setIsContextMenuVisible] = useState<boolean>(false)
    const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 })

    const contextMenuHandler = (event: MouseEvent) => {
        event.stopPropagation()
        const x = event.clientX
        const y = event.clientY
        setMousePos({
            x,
            y
        })
        setIsContextMenuVisible(true)
    }

    return (
        <>
            <AnimatePresence>
                {isContextMenuVisible && (
                    <ContextMenu
                        menuItems={[
                            {
                                id: `add-new`,
                                label: `Add new`,
                                icon: BlockAddIcon,
                                action: () => {
                                    setIsContextMenuVisible(false)
                                    if (dayToSub.subWith == null) {
                                        dispatch(updateTTFormCacheDay(dayId))
                                    } else {
                                        dispatch(updateSubDayToOpenBlockForm(dayId))
                                    }
                                    dispatch(showBlockForm())
                                }
                            },
                            {
                                id: `hide`,
                                label: `Hide day`,
                                icon: HideIcon,
                                action: () => {
                                    setIsContextMenuVisible(false)
                                    dispatch(toggleDaysToShow(dayId))
                                }
                            },
                            {
                                id: `sub-day`,
                                label: dayToSub.subWith == null ? `Substitute day` : `Remove Substitute`,
                                icon: SubstituteIcon,
                                action: () => {
                                    setIsContextMenuVisible(false)
                                    if (dayToSub.subWith == null) {
                                        dispatch(updateDayToOpenSubForm(dayId))
                                        dispatch(showSubstitutionForm())
                                    } else {
                                        dispatch(ttDaySubDeleted(dayId))
                                    }
                                }
                            }
                        ]}
                        position={mousePos}
                        closeHandler={() => setIsContextMenuVisible(false)}
                    />
                )}
            </AnimatePresence>
            <s.DayColumnContainer
                $dayId={dayId}
                onAuxClick={(event: MouseEvent<HTMLDivElement>) => contextMenuHandler(event)}
            >
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
                <s.BlocksContainer>
                    <AnimatePresence>
                        {blocks.map(block => (
                            <TimeBlock
                                key={block.id}
                                timeBlock={block}
                                daySub={dayToSub.subWith != null ? dayId : null}
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
