import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

import { ITimeBlock } from '@appTypes/TimeBlockInterfaces'

import BackwardIcon from '@assets/icons/BackwardItem.svg'
import HideIcon from '@assets/icons/EyeSlash.svg'

import ContextMenu, { ContextMenuItemType } from '@components/ContextMenu'

import useContextMenu from '@hooks/useContextMenu'

import {
    selectTTCurrentValidBlocksWithSub,
    selectTTHeaderBlock,
    selectTTShowCurrentBlock
} from '@redux/selectors/timetableSelectors'
import { ttHeaderBlockUpdated, ttShowCurrentBlockToggled } from '@redux/slices/timetableSlice'
import { useAppDispatch, useAppSelector } from '@redux/store'

import { getFirstCurrentBlock, getRemainingTimeString } from '@utils/timeUtils'

import * as s from './styles'

const CurrentBlockViewer = () => {
    const dispatch = useAppDispatch()

    const [currentBlock, setCurrentBlock] = useState<ITimeBlock | null>(null)
    const [title, setTitle] = useState<string>(``)
    const [subTitle, setSubTitle] = useState<string>(``)

    const headerBlock = useAppSelector(selectTTHeaderBlock)
    const blocks = useAppSelector(selectTTCurrentValidBlocksWithSub)
    const showCurrentBlock = useAppSelector(selectTTShowCurrentBlock)

    const { isContextMenuVisible, showContextMenu, hideContextMenu, mousePos } = useContextMenu()

    const currentBlockHandler = () => {
        const newBlock = getFirstCurrentBlock(blocks)
        setCurrentBlock(newBlock)
        if (newBlock != null && headerBlock == null) {
            setTitle(newBlock.title)
            setSubTitle(getRemainingTimeString(newBlock.endTime))
        } else {
            setTitle(``)
            setSubTitle(``)
        }
    }

    const headerBlockHandler = () => {
        if (headerBlock == null) {
            return
        }
        // A currently occurring block cannot be assigned
        const tempBlock = getFirstCurrentBlock(blocks)
        if (tempBlock != null && headerBlock.id == tempBlock.id) {
            dispatch(ttHeaderBlockUpdated(null))
        } else {
            // console.log(getRemainingTimeString(headerBlock.startTime))
            setTitle(headerBlock.title)
            setSubTitle(getRemainingTimeString(headerBlock.startTime))
        }
    }

    // Updating whenever there is a update in header block or the blocks itself
    useEffect(() => {
        let timer: NodeJS.Timer
        // Checking if a header block is present
        // If present, then a timer for updating with respect to header block is started
        if (headerBlock != null) {
            timer = setInterval(() => {
                headerBlockHandler()
            }, 500)
        } else {
            // If no header block, then check and update for current block
            timer = setInterval(() => {
                currentBlockHandler()
            }, 500)
        }
        if (currentBlock == null && headerBlock == null) {
            setTitle(``)
            setSubTitle(``)
        }
        return () => {
            // Clearing timer on unmount
            clearInterval(timer)
        }
    }, [blocks, headerBlock])

    let isCurrent = false
    // If there is header block, then the block is used else if a current block
    if (headerBlock != null) {
        isCurrent = false
    } else if (currentBlock != null) {
        isCurrent = true
    }

    const contextMenuItems: ContextMenuItemType[] = [
        {
            id: `hide-current`,
            label: `Hide`,
            icon: HideIcon,
            action() {
                dispatch(ttShowCurrentBlockToggled())
            }
        }
    ]

    // Ability to remove header block only if it exists
    if (!isCurrent) {
        contextMenuItems.push({
            id: `remove-header-block`,
            label: `Remove from header`,
            icon: BackwardIcon,
            action() {
                dispatch(ttHeaderBlockUpdated(null))
            }
        })
    }

    return (
        <>
            <AnimatePresence>
                {isContextMenuVisible && (
                    <ContextMenu menuItems={contextMenuItems} position={mousePos} closeHandler={hideContextMenu} />
                )}
            </AnimatePresence>
            <s.HeaderDetail onAuxClick={showContextMenu}>
                <AnimatePresence>
                    {title.length !== 0 && subTitle.length !== 0 && showCurrentBlock && (
                        <s.DetailsContentContainer>
                            <s.HeaderDetailHeading>{title || ``}</s.HeaderDetailHeading>
                            <s.HeaderDetailSubText>
                                {subTitle} {isCurrent && `remaining`}
                                {headerBlock && `to go`}
                            </s.HeaderDetailSubText>
                        </s.DetailsContentContainer>
                    )}
                </AnimatePresence>
            </s.HeaderDetail>
        </>
    )
}

export default CurrentBlockViewer
