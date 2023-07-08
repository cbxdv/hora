import { motion } from 'framer-motion'
import { styled } from 'styled-components'

import { flexCenter } from '@styles/styleDefinitions'

interface TimeBlockContainerProps {
    readonly $blockHeight: number
    readonly $blockColor: string
    readonly $positionalPad: number
    readonly $canceled: boolean
}

export const TimeBlockContainer = styled(motion.div).attrs(() => ({
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
}))<TimeBlockContainerProps>`
    width: 95%;
    margin: auto;
    ${flexCenter()};
    height: ${({ $blockHeight }) => $blockHeight}px;
    background-color: ${({ $blockColor }) => $blockColor};
    padding-right: 10px;
    border-radius: 8px;
    color: #29272c;
    position: absolute;
    top: ${({ $positionalPad }) => $positionalPad}px;
    box-shadow: ${({ theme }) => (theme.name === `light` ? `0px 0px 4px rgba(0, 0, 0, 0.25)` : ``)};
    transition: filter 0.2s linear;
    filter: ${({ $canceled }) => ($canceled ? `opacity(0.5)` : ``)};
`

export const StylingLineContainer = styled.div`
    ${flexCenter()};
    height: 100%;
    width: 30px;
    position: relative;
`

export const StylingLine = styled.div`
    margin: auto;
    width: 4px;
    height: 60%;
    background: #29272c;
    opacity: 0.2;
    border-radius: 4px;
`

export const BlockDetailsContainer = styled.div`
    height: 100%;
    width: 100%;
    ${flexCenter({ flexDirection: `column`, alignItems: `flex-start` })};
    overflow: hidden;
`

export const BlockDetail = styled.div`
    width: 100%;
`

export const BlockHeading = styled.p`
    font-weight: bold;
    font-size: 16px;
    font-weight: 600;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

export const BlockSubText = styled.p`
    font-size: 11px;
    height: 20px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top: 5px;
`
