import styled from 'styled-components'
import { motion } from 'framer-motion'
import { buttonStyles } from '../../styles/styleUtils'

export const NewBlockButtonContainer = styled(motion.button).attrs(() => ({
    whileHover: { filter: 'invert(8%)' },
    whileTap: { filter: 'invert(15%)', scale: 0.98 }
}))`
    ${buttonStyles()};
    height: 36px;
    font-size: 14px;
    scale: 1;
`

export const ButtonIconContainer = styled.div`
    height: 20px;
    width: 20px;
    margin-right: 10px;

    & > svg {
        fill: none;
        stroke: ${({ theme }) => theme.text};
        stroke-width: 2px;
    }
`
