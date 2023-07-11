import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

import { DayID } from '@appTypes/TimeBlockInterfaces'

import { ReactComponent as HideIcon } from '@assets/icons/EyeSlash.svg'

import ContextMenu, { ContextMenuItemType } from '@components/ContextMenu'

import useContextMenu from '@hooks/useContextMenu'

import { ttShowCurrentTimeToggled } from '@redux/slices/timetableSlice'
import { useAppDispatch } from '@redux/store'

import * as s from './styles'

const CurrentTimeViewer = () => {
    const dispatch = useAppDispatch()

    const [currentTime, setCurrentTime] = useState<string>(new Date().toLocaleTimeString().toString())
    const [currentDate, setCurrentDate] = useState<string>(new Date().toLocaleDateString().toString())
    const [currentDay, setCurrentDay] = useState<string>(DayID[new Date().getDay()])

    const { isContextMenuVisible, showContextMenu, hideContextMenu, mousePos } = useContextMenu()

    useEffect(() => {
        // Updating time every 500 milliseconds
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString())
        }, 500)

        return () => {
            // Clearing timer on unmount
            clearInterval(timer)
        }
    }, [])

    useEffect(() => {
        // Checking and replacing date if not matched with existing state
        if (currentDate !== new Date().toLocaleDateString()) {
            setCurrentDate(new Date().toLocaleDateString())
            setCurrentDay(DayID[new Date().getDay()])
        }
    }, [currentDate])

    const contextMenuItems: ContextMenuItemType[] = [
        {
            id: `hide-time`,
            label: `Hide`,
            icon: HideIcon,
            action() {
                dispatch(ttShowCurrentTimeToggled())
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
            <s.HeaderDetail onAuxClick={showContextMenu}>
                <s.DetailsContentContainer>
                    <s.HeaderDetailHeading>{currentTime}</s.HeaderDetailHeading>
                    <s.HeaderDetailSubText>
                        {currentDate} - {currentDay}
                    </s.HeaderDetailSubText>
                </s.DetailsContentContainer>
            </s.HeaderDetail>
        </>
    )
}

export default CurrentTimeViewer
