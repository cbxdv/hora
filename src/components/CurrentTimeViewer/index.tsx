import { useEffect, useState } from 'react'
import { convertDayIdToName } from '../../utilities/blockTimeUtils'
import { dayIdTypes } from '../../@types/TimeBlockInterfaces'
import * as s from './styles'

const CurrentTimeViewer = () => {
    const [currentTime, setCurrentTime] = useState<string>(new Date().toLocaleTimeString().toString())
    const [currentDate, setCurrentDate] = useState<string>(new Date().toLocaleDateString().toString())
    const [currentDay, setCurrentDay] = useState<string>(convertDayIdToName(new Date().getDay() as dayIdTypes))

    let timer: NodeJS.Timer

    useEffect(() => {
        timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString())
        }, 500)

        return () => {
            clearInterval(timer)
        }
    }, [])

    useEffect(() => {
        if (currentDate !== new Date().toLocaleDateString()) {
            setCurrentDate(new Date().toLocaleDateString())
            setCurrentDay(convertDayIdToName(new Date().getDay() as dayIdTypes))
        }
    })

    return (
        <s.TimeContainer>
            <s.Heading>{currentTime}</s.Heading>
            <s.SubText>
                {currentDate} - {currentDay}
            </s.SubText>
        </s.TimeContainer>
    )
}

export default CurrentTimeViewer
