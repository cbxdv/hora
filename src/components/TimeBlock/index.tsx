import { useState, MouseEvent } from 'react'
import { ITimeBlock } from '../../@types/TimeBlockInterfaces'
import ContextMenu from '../ContextMenu'
import { blockTimeTo12HourStr } from '../../utilities/blockTimeUtils'
import { useAppDispatch } from '../../redux/store'
import { AnimatePresence } from 'framer-motion'
import {
    blockDeleted,
    showBlockForm,
    updateDuplicateBlock,
    updateSelectedBlock
} from '../../redux/slices/timetableSlice'
import EditIcon from '../../assets/icons/Edit.svg'
import DuplicateIcon from '../../assets/icons/Copy.svg'
import TrashIcon from '../../assets/icons/Trash.svg'
import * as s from './styles'

const TimeBlock: React.FC<TimeBlockProps> = ({ timeBlock }) => {
    const dispatch = useAppDispatch()

    const [isContextMenuVisible, setIsContextMennuVisible] = useState<boolean>(false)
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
        const startTime = blockTimeTo12HourStr(timeBlock.startTime)
        const endTime = blockTimeTo12HourStr(timeBlock.endTime)
        return `${startTime} - ${endTime}`
    }

    const getTopPositionalPadding = () => {
        const startHour = timeBlock.startTime.hours
        const startMinutes = timeBlock.startTime.minutes
        const topMinutes = startHour * 60 + startMinutes
        return topMinutes * 1.5
    }

    const contextMenuHandler = (event: MouseEvent) => {
        const x = event.clientX
        const y = event.clientY
        setMousePos({
            x,
            y
        })
        setIsContextMennuVisible(true)
    }

    return (
        <>
            <AnimatePresence>
                {isContextMenuVisible && (
                    <ContextMenu
                        menuItems={[
                            {
                                id: 'edit',
                                name: 'Edit',
                                icon: EditIcon,
                                action: () => {
                                    setIsContextMennuVisible(false)
                                    dispatch(updateSelectedBlock(timeBlock))
                                    dispatch(showBlockForm())
                                }
                            },
                            {
                                id: 'duplicate',
                                name: 'Duplicate',
                                icon: DuplicateIcon,
                                action: () => {
                                    setIsContextMennuVisible(false)
                                    dispatch(updateDuplicateBlock(timeBlock))
                                    dispatch(showBlockForm())
                                }
                            },
                            {
                                id: 'delete',
                                name: 'Delete',
                                icon: TrashIcon,
                                action: () => {
                                    setIsContextMennuVisible(false)
                                    dispatch(blockDeleted({ day: timeBlock.day, id: timeBlock.id }))
                                },
                                danger: true
                            }
                        ]}
                        position={mousePos}
                        closeHandler={() => setIsContextMennuVisible(false)}
                    />
                )}
            </AnimatePresence>
            <s.TimeBlockContainer
                $blockHeight={getBlockHeight()}
                $blockColor={timeBlock.color}
                $positionalPad={getTopPositionalPadding()}
                onAuxClick={(event: React.MouseEvent<HTMLDivElement>) => contextMenuHandler(event)}
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
}

export default TimeBlock
