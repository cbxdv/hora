import { Themes } from '@appTypes/AppInterfaces'
import { StyledTheme } from '@appTypes/styled'

export const lightThemeColors: StyledTheme = {
    name: Themes.Light,
    background: `#FCFCFC`,
    text: `#29272C`,
    sec: `#83888F`,
    shade1: `#F2F3F7`,
    shade2: `#FEFEFE`,
    selected: `#E8E9ED`,
    contextBackground: `rgba(254, 254, 254, 0.5)`,
    modalBackground: `rgba(0, 0, 0, 0.5)`,
    shadow: `0px 0px 4px rgba(0, 0, 0, 0.25)`
}

export const darkThemeColors: StyledTheme = {
    name: Themes.Dark,
    background: `#1C1D21`,
    text: `#E7E7E8`,
    sec: `#707070`,
    shade1: `#25262D`,
    shade2: `#464A53`,
    selected: `#393A41`,
    contextBackground: `rgba(70, 74, 83, 0.8)`,
    modalBackground: `rgba(255, 255, 255, 0.05)`,
    shadow: `0px 0px 4px rgba(0, 0, 0, 0.25)`
}

export const varietyColors: { [key: string]: string } = {
    decoPeach: `#FFADAD`,
    deepChampagne: `#FFD6A5`,
    crayola: `#FAE588`,
    teaGreen: `#CAFFBF`,
    celeste: `#9BF6FF`,
    babyBlueEyes: `#A0C4FF`,
    greyedLavender: `#BDB2FF`,
    mauve: `#FFC6FF`,
    linen: `#F5EBE0`,
    beige: `#EAF2D7`
}
