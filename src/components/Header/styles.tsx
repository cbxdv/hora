import { motion } from 'framer-motion'
import styled from 'styled-components'

import { flexCenter } from '@styles/styleDefinitions'

export const LogoContainer = styled.div`
    height: 40px;
    width: 40px;
`

export const HeaderContainer = styled.div`
    ${flexCenter({ justifyContent: `space-between` })};
    background-color: ${props => props.theme.background};
    height: 90px;
    width: 100%;
    padding: 10px 60px;
`

export const DetailsContainer = styled.div`
    display: flex;
`

export const ActionsContainer = styled.div`
    ${flexCenter({ justifyContent: `space-between` })};
    width: 175px;
`

const HeaderDetailVariant = {
    hide: { maxWidth: 0, padding: 0 },
    show: { maxWidth: 150 }
}

export const HeaderDetail = styled(motion.div).attrs(() => ({
    variants: HeaderDetailVariant,
    initial: `hide`,
    animate: `show`,
    exit: `hide`
}))`
    ${flexCenter({ flexDirection: `column` })};
    background-color: ${({ theme }) => theme.shade1};
    border-radius: 8px;
    height: 60px;
    max-width: 150px;
`

const DetailsContentContainerVariant = {
    hide: { opacity: 0, width: 0, padding: 0 },
    show: { opacity: 1, width: 150, padding: 10 }
}

export const DetailsContentContainer = styled(motion.div).attrs(() => ({
    variants: DetailsContentContainerVariant,
    initial: `hide`,
    animate: `show`,
    exit: `hide`
}))`
    ${flexCenter({ flexDirection: `column` })};
    background-color: ${({ theme }) => theme.shade1};
    border-radius: 8px;
    height: 60px;
    width: 150px;
    padding: 10px;
`

const childrenVariant = {
    hide: { opacity: 0, width: 0 },
    show: { opacity: 1, width: `100%` }
}

export const HeaderDetailHeading = styled(motion.h1).attrs(() => ({
    variants: childrenVariant
}))`
    text-align: center;
    width: 100%;
    font-size: 14px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

export const HeaderDetailSubText = styled(motion.p).attrs(() => ({
    variants: childrenVariant
}))`
    margin-top: 3px;
    text-align: center;
    width: 100%;
    font-size: 12px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`
