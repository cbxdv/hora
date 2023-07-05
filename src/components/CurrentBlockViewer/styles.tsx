import { styled } from 'styled-components'
import { flexCenter } from '../../styles/styleUtils'

export const CBlockContainer = styled.div`
    ${flexCenter({ flexDirection: 'column' })};
    background-color: ${({ theme }) => theme.shade1};
    border-radius: 8px;
    height: 60px;
    width: 150px;
    padding: 10px;
    margin-left: 30px;
`

export const Heading = styled.h1`
    text-align: center;
    width: 100%;
    font-size: 15px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

export const SubText = styled.p`
    margin-top: 3px;
    font-size: 12px;
`
