import { styled } from 'styled-components'
import { flexCenter } from '../../styles/styleUtils'

export const TimeContainer = styled.div`
    ${flexCenter({ flexDirection: 'column' })};
    background-color: ${({ theme }) => theme.shade1};
    border-radius: 8px;
    height: 60px;
    width: 150px;
    padding: 10px;
`

export const Heading = styled.h1`
    font-size: 15px;
`

export const SubText = styled.p`
    margin-top: 3px;
    font-size: 12px;
`
