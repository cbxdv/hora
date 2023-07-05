import { styled } from 'styled-components'
import { motion } from 'framer-motion'
import { buttonStyles, flexCenter } from '../../styles/styleDefinitions'

export const IconButtonContainer = styled(motion.button).attrs(() => ({
    whileHover: { filter: 'invert(8%)' },
    whileTap: { filter: 'invert(15%)', scale: 0.98 }
}))<{ $size: number }>`
    ${buttonStyles()};
    width: ${({ $size }) => $size}px;
    height: ${({ $size }) => $size}px;
    scale: 1;
`

export const IconContainer = styled.div`
    height: 20px;
    width: 20px;
    ${flexCenter()};

    & > svg {
        height: 20px;
        width: 20px;
        stroke-width: 2px;
        fill: none;
        stroke: ${({ theme }) => theme.text};
    }
`
