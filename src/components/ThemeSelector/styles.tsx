import styled from 'styled-components'
import { motion } from 'framer-motion'
import { flexCenter } from '../../styles/styleDefinitions'

export const ThemeSelectorContainer = styled.div`
    width: 100%;
    ${flexCenter()};
    padding: 5px 0;
    margin-bottom: 5px;
`

export const ThemeButton = styled(motion.div).attrs(({ theme }) => ({
    whileHover: { borderColor: `${theme.name === 'light' ? `rgba(0, 0, 0, 0.1)` : `rgba(255, 255, 255, 0.2)`}` },
    whileTap: { filter: 'invert(15%)', scale: 0.98 }
}))<{ $selected?: boolean }>`
    width: 90px;
    border-radius: 8px;
    margin: 0 10px;
    font-size: 12px;
    text-align: center;
    cursor: pointer;
    transition: 0.1s transform linear;
    position: relative;
    scale: 1;
`

export const ThemeButtonImage = styled.div`
    position: relative;
`

export const ThemeImageSelected = styled.div`
    position: absolute;
    top: 0;
    left: 0;
`

export const ThemeButtonText = styled.div`
    margin-top: 2px;
`
