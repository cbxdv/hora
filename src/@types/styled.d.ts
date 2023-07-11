/* eslint-disable  */

import {} from 'styled-components'
import { Themes } from './AppInterfaces'

export interface StyledTheme {
    name: Themes
    background: string
    text: string
    sec: string
    shade1: string
    shade2: string
    selected: string
    contextBackground: string
    modalBackground: string
    shadow: string
}

// global typescript declaration for the theme
declare module 'styled-components' {
    type Theme = typeof theme
    export interface DefaultTheme extends StyledTheme {}
}
