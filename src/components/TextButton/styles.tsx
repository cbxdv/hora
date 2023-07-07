import { motion } from 'framer-motion'
import styled from 'styled-components'

import { buttonStyles } from '@styles/styleDefinitions'

export const TextButtonContainer = styled(motion.button).attrs(() => ({
    whileHover: { filter: `invert(8%)` },
    whileTap: { filter: `invert(15%)`, scale: 0.98 }
}))<{ $danger?: boolean }>`
    ${props => buttonStyles(props.$danger)}
`
