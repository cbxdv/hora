import { css } from 'styled-components'

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
        alignItems = 'center'
    }
    if (!justifyContent) {
        justifyContent = 'center'
    }
    if (!flexDirection) {
        flexDirection = 'row'
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
    border: 0.1px solid ${({ theme }) => (theme.name === 'light' ? `rgba(0, 0, 0, 0.1)` : `rgba(255, 255, 255, 0.05)`)};
`

export const buttonStyles = (danger?: boolean) => css`
    border: none;
    outline: none;
    ${flexCenter()};
    height: 30px;
    width: 120px;
    background-color: ${({ theme }) => (danger ? `rgba(199, 97, 98, 0.25);` : theme.shade1)};
    color: ${({ theme }) => (danger ? `#C76162` : theme.text)};
    font-size: 12px;
    font-weight: 500;
    border-radius: 8px;
    cursor: pointer;
    ${subtleBorder};
`
