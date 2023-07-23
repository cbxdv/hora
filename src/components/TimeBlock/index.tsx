import { AnimatePresence } from 'framer-motion'

import { DayID, ITimeBlock } from '@appTypes/TimeBlockInterfaces'

import CancelIcon from '@assets/icons/Cancel.svg'
import DuplicateIcon from '@assets/icons/Copy.svg'
import EditIcon from '@assets/icons/Edit.svg'
import ForwardIcon from '@assets/icons/ForwardItem.svg'
import TrashIcon from '@assets/icons/Trash.svg'

import ContextMenu, { ContextMenuItemType } from '@components/ContextMenu'

import useConfirm from '@hooks/useConfirm'
import useContextMenu from '@hooks/useContextMenu'

import { selectTTCanceledBlocks, selectTTHeaderBlock, selectTTSubDayCancels } from '@redux/selectors/timetableSelectors'
import {
    ttBlockDeleted,
    ttBlockFormedOpened,
    ttCancellationAdded,
    ttCancellationDeleted,
    ttDupBlockUpdated,
    ttSelectedBlockUpdated,
    ttSubDayToOpenBlockFormUpdated,
    ttHeaderBlockUpdated
} from '@redux/slices/timetableSlice'
import { useAppDispatch, useAppSelector } from '@redux/store'

import { checkIsBlockCanceled } from '@utils/timetableUtils'
import { getFirstCurrentBlock, timeObjectTo12HourStr } from '@utils/timeUtils'

import * as s from './styles'

const TimeBlock: React.FC<TimeBlockProps> = ({ timeBlock, subDay }) => {
    const dispatch = useAppDispatch()

    const blockInHeader = useAppSelector(selectTTHeaderBlock)

    const { isContextMenuVisible, showContextMenu, hideContextMenu, mousePos } = useContextMenu()

    const getBlockHeight = () => {
        // Conversion rate -> 60 mins = 90px
        // Height = 1.5 * mins
        const hoursDiff = timeBlock.endTime.hours - timeBlock.startTime.hours
        const minutesDiff = timeBlock.endTime.minutes - timeBlock.startTime.minutes
        const totalMinutes = hoursDiff * 60 + minutesDiff
        return totalMinutes * 1.5
    }

    const getBlockSubText = () => {
        const startTime = timeObjectTo12HourStr(timeBlock.startTime)
        const endTime = timeObjectTo12HourStr(timeBlock.endTime)
        return `${startTime} - ${endTime}`
    }

    const getTopPositionalPadding = () => {
        const startHour = timeBlock.startTime.hours
        const startMinutes = timeBlock.startTime.minutes
        const topMinutes = startHour * 60 + startMinutes
        return topMinutes * 1.5
    }

    const subDayCancels = useAppSelector(state => selectTTSubDayCancels(state, subDay || timeBlock.startTime.day))
    const cancels = useAppSelector(selectTTCanceledBlocks)

    let isCanceled = false
    if (subDay != null) {
        const canceledBlocks = subDayCancels
        isCanceled = checkIsBlockCanceled(timeBlock, canceledBlocks)
    } else {
        const canceledBlocks = cancels
        isCanceled = checkIsBlockCanceled(timeBlock, canceledBlocks)
    }

    const isHeaderBlock = blockInHeader != null && blockInHeader.id == timeBlock.id

    const confirm = useConfirm()
    const deleteHandler = async () => {
        if (confirm == null) {
            return
        }
        const response = await confirm({
            title: `Delete`,
            description: `Delete this block (${timeBlock.title}) ?`,
            acceptText: `Delete`,
            rejectText: `Nope`
        })
        if (response) {
            dispatch(ttBlockDeleted({ day: timeBlock.startTime.day, id: timeBlock.id, isSubDay: subDay != null }))
        }
    }

    const contextMenuItems: ContextMenuItemType[] = [
        {
            id: `edit`,
            label: `Edit`,
            icon: EditIcon,
            action() {
                if (subDay != null) {
                    dispatch(ttSubDayToOpenBlockFormUpdated(subDay))
                }
                dispatch(ttSelectedBlockUpdated(timeBlock))
                dispatch(ttBlockFormedOpened())
            }
        },
        {
            id: `duplicate`,
            label: `Duplicate`,
            icon: DuplicateIcon,
            action() {
                dispatch(ttDupBlockUpdated(timeBlock))
                dispatch(ttBlockFormedOpened())
            }
        },
        {
            id: `cancel`,
            label: isCanceled ? `Restore` : `Cancel`,
            icon: CancelIcon,
            action() {
                if (isCanceled) {
                    dispatch(ttCancellationDeleted({ blockId: timeBlock.id, subDay: subDay }))
                } else {
                    dispatch(ttCancellationAdded({ blockId: timeBlock.id, subDay: subDay }))
                }
            }
        },
        {
            id: `delete`,
            label: `Delete`,
            icon: TrashIcon,
            action() {
                deleteHandler()
            },
            danger: true
        }
    ]

    // Ability to add to header block only if it is not a current block
    if (getFirstCurrentBlock([timeBlock]) === null) {
        contextMenuItems.unshift({
            id: `track`,
            label: isHeaderBlock ? `Remove from header` : `Show in header`,
            icon: ForwardIcon,
            action() {
                if (isHeaderBlock) {
                    dispatch(ttHeaderBlockUpdated(null))
                } else {
                    dispatch(ttHeaderBlockUpdated(timeBlock))
                }
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
            <s.TimeBlockContainer
                $blockHeight={getBlockHeight()}
                $blockColor={timeBlock.color}
                $positionalPad={getTopPositionalPadding()}
                $canceled={isCanceled}
                onAuxClick={showContextMenu}
            >
                <s.StylingLineContainer>
                    <s.StylingLine />
                </s.StylingLineContainer>
                <s.BlockDetailsContainer>
                    <s.BlockDetail>
                        <s.BlockHeading>{timeBlock.title}</s.BlockHeading>
                    </s.BlockDetail>
                    <s.BlockDetail>
                        {getBlockHeight() >= 60 && <s.BlockSubText>{getBlockSubText()}</s.BlockSubText>}
                    </s.BlockDetail>
                </s.BlockDetailsContainer>
            </s.TimeBlockContainer>
        </>
    )
}

type TimeBlockProps = {
    timeBlock: ITimeBlock
    subDay: DayID | null
}

export default TimeBlock
