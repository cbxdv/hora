import * as s from './styles'

const Timeline = () => {
    const generateTimeStrings = () => {
        const components = []
        for (let i = 0; i <= 24; i++) {
            let text = ``
            if (i === 0) {
                text = `12 a.m.`
            } else if (i < 12) {
                text = `${i} a.m.`
            } else if (i === 12) {
                text = `12 p.m.`
            } else {
                text = `${i - 12} p.m.`
            }

            components.push(<p key={`time-${i}`}>{text}</p>)
        }
        return components
    }

    return (
        <s.Timeline>
            <s.TimelineStarter />
            <s.TimelineContainer>{generateTimeStrings()}</s.TimelineContainer>
        </s.Timeline>
    )
}

export default Timeline
