import { AnimatePresence } from 'framer-motion'
import { useState, MouseEvent } from 'react'

import { DayID, ITimeBlock } from '@appTypes/TimeBlockInterfaces'

import CancelIcon from '@assets/icons/Cancel.svg'
import DuplicateIcon from '@assets/icons/Copy.svg'
import EditIcon from '@assets/icons/Edit.svg'
import TrashIcon from '@assets/icons/Trash.svg'

import ContextMenu from '@components/ContextMenu'

import {
    addBlockCancellation,
    blockDeleted,
    deleteBlockCancellation,
    selectCanceledBlocks,
    selectSubDayCancellation,
    showBlockForm,
    updateDuplicateBlock,
    updateSelectedBlock,
    updateSubDayToOpenBlockForm
} from '@redux/slices/timetableSlice'
import { useAppDispatch, useAppSelector } from '@redux/store'

import { checkIsBlockCanceled } from '@utils/timetableUtils'
import { timeObjectTo12HourStr } from '@utils/timeUtils'

import * as s from './styles'

const TimeBlock: React.FC<TimeBlockProps> = ({ timeBlock, daySub }) => {
    const dispatch = useAppDispatch()

    const [isContextMenuVisible, setIsContextMenuVisible] = useState<boolean>(false)
    const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 })

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

    let isCanceled = false
    if (daySub != null) {
        const canceledBlocks = useAppSelector(state => selectSubDayCancellation(state, daySub))
        isCanceled = checkIsBlockCanceled(timeBlock, canceledBlocks)
    } else {
        const canceledBlocks = useAppSelector(selectCanceledBlocks)
        isCanceled = checkIsBlockCanceled(timeBlock, canceledBlocks)
    }

    return (
        <>
            <AnimatePresence>
                {isContextMenuVisible && (
                    <ContextMenu
                        menuItems={[
                            {
                                id: `edit`,
                                label: `Edit`,
                                icon: EditIcon,
                                action: () => {
                                    setIsContextMenuVisible(false)
                                    if (daySub != null) {
                                        dispatch(updateSubDayToOpenBlockForm(daySub))
                                    }
                                    dispatch(updateSelectedBlock(timeBlock))
                                    dispatch(showBlockForm())
                                }
                            },
                            {
                                id: `duplicate`,
                                label: `Duplicate`,
                                icon: DuplicateIcon,
                                action: () => {
                                    setIsContextMenuVisible(false)
                                    dispatch(updateDuplicateBlock(timeBlock))
                                    dispatch(showBlockForm())
                                }
                            },
                            {
                                id: `cancel`,
                                label: isCanceled ? `Restore` : `Cancel`,
                                icon: CancelIcon,
                                action: () => {
                                    setIsContextMenuVisible(false)
                                    if (isCanceled) {
                                        dispatch(deleteBlockCancellation({ blockId: timeBlock.id, subDay: daySub }))
                                    } else {
                                        dispatch(addBlockCancellation({ blockId: timeBlock.id, subDay: daySub }))
                                    }
                                }
                            },
                            {
                                id: `delete`,
                                label: `Delete`,
                                icon: TrashIcon,
                                action: () => {
                                    setIsContextMenuVisible(false)
                                    dispatch(blockDeleted({ day: timeBlock.day, id: timeBlock.id, daySub }))
                                },
                                danger: true
                            }
                        ]}
                        position={mousePos}
                        closeHandler={() => setIsContextMenuVisible(false)}
                    />
                )}
            </AnimatePresence>
            <s.TimeBlockContainer
                $blockHeight={getBlockHeight()}
                $blockColor={timeBlock.color}
                $positionalPad={getTopPositionalPadding()}
                $canceled={isCanceled}
                onAuxClick={(event: MouseEvent<HTMLDivElement>) => contextMenuHandler(event)}
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
    daySub: DayID | null
}

export default TimeBlock
