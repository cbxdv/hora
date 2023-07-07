import { styled } from 'styled-components'

export const Timeline = styled.div`
    margin-right: 10px;
    height: 2200px;
`

export const TimelineStarter = styled.div`
    height: 40px;
    width: 40px;
    background-color: ${(props) => props.theme.background};
    position: sticky;
    top: 0;
    z-index: 1;
`

export const TimelineContainer = styled.div`
    width: 40px;
    height: 2160px;
    font-size: 12px;
    position: relative;
`

export const TimeLineElement = styled.div<{ $nth: number }>`
    position: absolute;
    top: ${(props) => props.$nth * 90}px;
    transform: translateY(-50%);
    transform: ${(props) => (props.$nth === 0 ? `none` : ``)};
    transform: ${(props) => (props.$nth === 24 ? `translateY(-100%)` : ``)};
`
