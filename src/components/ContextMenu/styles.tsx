import { motion } from 'framer-motion'
import { styled } from 'styled-components'

import { flexCenter, hoverAndTapMotion, subtleBorder } from '@styles/styleDefinitions'

export const ContextMenuContainer = styled(motion.div).attrs(() => ({
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.1 }
}))<{ $x: number; $y: number }>`
    min-width: 120px;
    position: fixed;
    background: ${props => props.theme.contextBackground};
    box-shadow: ${({ theme }) => theme.shadow};
    ${subtleBorder};
    backdrop-filter: blur(4px);
    border-radius: 8px;
    padding: 5px;
    padding-bottom: 0;
    top: ${props => props.$y}px;
    left: ${props => props.$x}px;
    z-index: 1;
`

export const MenuItem = styled(motion.div).attrs(({ theme }) => ({
    ...hoverAndTapMotion(theme.name)
}))<{ $danger?: boolean }>`
    ${flexCenter({ justifyContent: `flex-start` })};
    width: 100%;
    padding: 5px 10px;
    background: transparent;
    border-radius: 8px;
    color: ${props => (props.$danger ? `#C76162` : props.theme.text)};
    font-size: 13px;
    margin-bottom: 5px;
    border: 0.1px solid transparent;
    cursor: pointer;
    scale: 1;
`

export const MenuItemIcon = styled.div<{ $danger?: boolean }>`
    margin-right: 10px;
    ${flexCenter()};

    & > svg {
        height: 16px;
        width: 16px;
        fill: none;
        stroke: ${({ theme, $danger }) => ($danger ? `#C76162` : theme.text)};
        stroke-width: 2px;
    }
`
