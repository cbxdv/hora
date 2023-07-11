import { AnimatePresence } from 'framer-motion'

import DayColumn from '@components/DayColumn'
import Timeline from '@components/Timeline'

import { selectTTDaysToShow } from '@redux/selectors/timetableSelectors'
import { useAppSelector } from '@redux/store'

import * as s from './styles'

const WeekViewer = () => {
    const daysToShow = useAppSelector(selectTTDaysToShow)

    return (
        <s.WeekViewerContainer>
            <s.WeekViewerContents>
                <s.TimelineContainer>
                    <Timeline />
                </s.TimelineContainer>
                <s.DaysContainer>
                    <AnimatePresence>
                        {daysToShow[1] && <DayColumn dayId={1} key={`day-col-1`} />}
                        {daysToShow[2] && <DayColumn dayId={2} key={`day-col-2`} />}
                        {daysToShow[3] && <DayColumn dayId={3} key={`day-col-3`} />}
                        {daysToShow[4] && <DayColumn dayId={4} key={`day-col-4`} />}
                        {daysToShow[5] && <DayColumn dayId={5} key={`day-col-5`} />}
                        {daysToShow[6] && <DayColumn dayId={6} key={`day-col-6`} />}
                        {daysToShow[0] && <DayColumn dayId={0} key={`day-col-0`} />}
                    </AnimatePresence>
                </s.DaysContainer>
            </s.WeekViewerContents>
        </s.WeekViewerContainer>
    )
}

export default WeekViewer
