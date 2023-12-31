import { useEffect, useRef, useState } from 'react'

import * as s from './styles'

const CurrentTimeLine = () => {
    const timeLineRef = useRef<HTMLDivElement>(null)

    const [pos, setPos] = useState<number>(0)

    const updateStartingPosition = () => {
        const now = new Date()
        const start = now.getHours() * 90 + now.getMinutes() * 1.5
        setPos(start)
    }

    const scrollTo = () => {
        if (timeLineRef.current) {
            timeLineRef.current.scrollIntoView({
                behavior: `smooth`,
                block: `center`
            })
        }
    }

    useEffect(() => {
        const keyBindHandler = (event: KeyboardEvent) => {
            if (event.key === `f` || event.key === `F`) {
                scrollTo()
            }
        }

        // Updating every 60 seconds
        const timer = setInterval(() => {
            updateStartingPosition()
        }, 60000)
        updateStartingPosition()
        setTimeout(() => scrollTo(), 500)

        // Add key bindings while mounting
        window.addEventListener(`keydown`, keyBindHandler)

        return () => {
            // Removing key bindings on unmount
            window.removeEventListener(`keydown`, keyBindHandler)
            // Clearing timer on unmount
            clearInterval(timer)
        }
    }, [])

    return (
        <s.TimeLineContainer $startPosition={pos} ref={timeLineRef}>
            <s.TimeLineIndicator />
        </s.TimeLineContainer>
    )
}

export default CurrentTimeLine
