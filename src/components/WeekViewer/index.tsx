import DayColumn from '@components/DayColumn'
import Timeline from '@components/Timeline'

import { selectDaysToShow } from '@redux/slices/timetableSlice'
import { useAppSelector } from '@redux/store'

import * as s from './styles'

const WeekViewer = () => {
    const daysToShow = useAppSelector(selectDaysToShow)

    return (
        <s.WeekViewerContainer>
            <s.TimelineContainer>
                <Timeline />
            </s.TimelineContainer>
            <s.DaysContainer>
                {daysToShow[1] && <DayColumn dayId={1} />}
                {daysToShow[2] && <DayColumn dayId={2} />}
                {daysToShow[3] && <DayColumn dayId={3} />}
                {daysToShow[4] && <DayColumn dayId={4} />}
                {daysToShow[5] && <DayColumn dayId={5} />}
                {daysToShow[6] && <DayColumn dayId={6} />}
                {daysToShow[0] && <DayColumn dayId={0} />}
            </s.DaysContainer>
        </s.WeekViewerContainer>
    )
}

export default WeekViewer
