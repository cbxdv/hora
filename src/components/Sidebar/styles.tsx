import { motion } from 'framer-motion'
import { styled } from 'styled-components'

import { buttonWithStyles, flexCenter } from '@styles/styleDefinitions'

export const SidebarDrop = styled(motion.div).attrs(() => ({
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
}))`
    height: 100%;
    width: 100%;
    background-color: ${props => props.theme.modalBackground};
    backdrop-filter: blur(4px);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 4;
`

export const SidebarContainer = styled(motion.div).attrs(() => ({
    initial: { translateX: -250 },
    animate: { translateX: 0 },
    exit: { translateX: -250 },
    transition: { ease: `easeIn`, duration: 0.1 }
}))`
    width: 250px;
    height: 100vh;
    background-color: ${({ theme }) => theme.background};
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`

export const LogoContainer = styled.div`
    height: 80px;
    width: 100%;
    display: flex;
    align-items: center;
    padding-left: 60px;

    & > svg {
        height: 40px;
        width: 40px;
    }
`

export const LogoTextContainer = styled.div`
    height: 30px;
    width: 30px;
    margin-left: 20px;

    & > svg {
        width: 60px;
        height: 30px;

        & > path {
            stroke: ${({ theme }) => theme.text};
            fill: ${({ theme }) => theme.text};
        }
    }
`

export const SidebarContent = styled.div`
    height: 100%;
    width: 100%;
    padding: 10px;
`

export const TopContainer = styled.div`
    width: 100%;
`

export const BottomContainer = styled.div`
    width: 100%;
    padding: 10px;
`

export const SidebarItemContainer = styled(buttonWithStyles)`
    width: 100%;
    height: 50px;
    scale: 1;
`

export const SidebarItemIconContainer = styled.div`
    height: 20px;
    width: 20px;
    ${flexCenter()};

    & > svg {
        height: 20px;
        width: 20px;

        & > path {
            stroke-width: 2px;
            stroke: ${({ theme }) => theme.text};
        }
    }
`

export const SidebarItemTextContainer = styled.div`
    margin-left: 6px;
`
