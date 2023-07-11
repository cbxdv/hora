import { motion } from 'framer-motion'
import { css, styled } from 'styled-components'

import { Themes } from '@appTypes/AppInterfaces'

interface FlexCenterInterface {
    alignItems?: string
    justifyContent?: string
    flexDirection?: string
}
/**
 * Center a element using flex
 * @param {{alignItems?: String, justifyContent?: String, flexDirection? : String}} options
 * Options for flex
 */
export function flexCenter(options: FlexCenterInterface = {}) {
    let { alignItems, justifyContent, flexDirection } = options
    if (!alignItems) {
        alignItems = `center`
    }
    if (!justifyContent) {
        justifyContent = `center`
    }
    if (!flexDirection) {
        flexDirection = `row`
    }
    return css`
        display: flex;
        align-items: ${alignItems};
        justify-content: ${justifyContent};
        flex-direction: ${flexDirection};
    `
}

/**
 * Provides a border for the subtle & easy border for the element
 */
export const subtleBorder = css`
    border: 0.1px solid ${({ theme }) => (theme.name === `light` ? `rgba(0, 0, 0, 0.1)` : `rgba(255, 255, 255, 0.05)`)};
`

/**
 * A button with all styles and motion properties.
 * Has optional $danger prop definition for a dangered color buton.
 */
export const buttonWithStyles = styled(motion.button).attrs(() => ({
    whileHover: { filter: `invert(8%)` },
    whileTap: { filter: `invert(15%)`, scale: 0.98 }
}))<{ $danger?: boolean }>`
    border: none;
    outline: none;
    ${flexCenter()};
    height: 30px;
    width: 120px;
    background-color: ${({ theme, $danger }) => ($danger ? `rgba(199, 97, 98, 0.25);` : theme.shade1)};
    color: ${({ theme, $danger }) => ($danger ? `#C76162` : theme.text)};
    font-size: 12px;
    font-weight: 500;
    border-radius: 8px;
    cursor: pointer;
    ${subtleBorder};
    scale: 1;
`

/**
 * A hover and motion properties for elements. Uses border color and filter.
 * @param theme Theme used currently
 * @returns A object with motion props
 */
export const hoverAndTapMotion = (theme: Themes) => {
    if (theme === Themes.Light) {
        return {
            whileHover: { borderColor: `rgba(0, 0, 0, 0.1)` },
            whileTap: { filter: `invert(15%)`, scale: 0.98 }
        }
    } else {
        return {
            whileHover: { borderColor: `rgba(255, 255, 255, 0.2)` },
            whileTap: { filter: `invert(15%)`, scale: 0.98 }
        }
    }
}
