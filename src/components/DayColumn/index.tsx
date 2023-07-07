import { AnimatePresence } from 'framer-motion'

import { DayID } from '@appTypes/TimeBlockInterfaces'

import CurrentTimeLine from '@components/CurrentTimeLine'
import TimeBlock from '@components/TimeBlock'

import { selectBlocksByDayId } from '@redux/slices/timetableSlice'
import { useAppSelector } from '@redux/store'

import * as s from './styles'

const DayColumn: React.FC<DayColumnProps> = ({ dayId }) => {
    const blocks = useAppSelector(state => selectBlocksByDayId(state, dayId))
    return (
        <s.DayColumnContainer $dayId={dayId}>
            <s.DayIndicator $today={dayId === new Date().getDay()}>{DayID[dayId]}</s.DayIndicator>
            <s.BlocksContainer>
                <AnimatePresence>
                    {blocks.map(block => (
                        <TimeBlock key={block.id} timeBlock={block} />
                    ))}
                </AnimatePresence>
                {new Date().getDay() === dayId && <CurrentTimeLine />}
            </s.BlocksContainer>
        </s.DayColumnContainer>
    )
}

type DayColumnProps = {
    dayId: DayID
}

export default DayColumn
