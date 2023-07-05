import TimeBlock from '../TimeBlock'
import { AnimatePresence } from 'framer-motion'
import { convertDayIdToName } from '../../utilities/blockTimeUtils'
import { useAppSelector } from '../../redux/store'
import { selectBlocksByDayId } from '../../redux/slices/timetableSlice'
import { dayIdTypes } from '../../@types/TimeBlockInterfaces'
import CurrentTimeLine from '../CurrentTimeLine'
import * as s from './styles'

const DayColumn: React.FC<DayColumnProps> = ({ dayId }) => {
    const blocks = useAppSelector((state) => selectBlocksByDayId(state, dayId))
    return (
        <s.DayColumnContainer $dayId={dayId}>
            <s.DayIndicator $today={dayId === new Date().getDay()}>{convertDayIdToName(dayId)}</s.DayIndicator>
            <s.BlocksContainer>
                <AnimatePresence>
                    {blocks.map((block) => (
                        <TimeBlock key={block.id} timeBlock={block} />
                    ))}
                </AnimatePresence>
                {new Date().getDay() === dayId && <CurrentTimeLine />}
            </s.BlocksContainer>
        </s.DayColumnContainer>
    )
}

type DayColumnProps = {
    dayId: dayIdTypes
}

export default DayColumn
