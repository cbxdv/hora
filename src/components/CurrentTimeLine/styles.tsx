import styled from 'styled-components'

export const TimeLineContainer = styled.div<{ $startPosition: number }>`
    position: absolute;
    top: ${({ $startPosition }) => $startPosition}px;
    width: 100%;
    left: 0;
    border: 1px dashed #fd2513;
    box-shadow: 0 0 10px 0 #fd2513;
    scroll-behavior: smooth;
`

export const TimeLineIndicator = styled.div`
    width: 0;
    height: 0;
    position: absolute;
    left: -1px;
    top: -4px;
    border-radius: 100%;
    border: 4px solid #fd2513;
`
