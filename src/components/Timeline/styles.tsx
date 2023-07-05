import { styled } from 'styled-components'
import { flexCenter } from '../../styles/styleUtils'

export const Timeline = styled.div`
    margin-right: 10px;
`

export const TimelineStarter = styled.div`
    height: 40px;
    width: 40px;
    background-color: ${(props) => props.theme.background};
    position: sticky;
    top: 90px;
    z-index: 1;
`

export const TimelineContainer = styled.div`
    ${flexCenter({ alignItems: 'center', justifyContent: 'space-between', flexDirection: 'column' })}
    width: 40px;
    height: 2160px;
    font-size: 12px;

    p {
        transform: translateY(-50%);
    }

    & p:first-of-type {
        transform: none;
    }
`
