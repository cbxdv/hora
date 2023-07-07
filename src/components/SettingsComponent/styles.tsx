import { motion } from 'framer-motion'
import { styled } from 'styled-components'

import { flexCenter } from '@styles/styleDefinitions'

export const SettingsContainer = styled.div`
    width: 100%;
    height: 100%;
    padding-top: 10px;
    display: flex;
`

export const SettingsSidebar = styled.div`
    width: 120px;

    ul {
        list-style: none;
    }
`

export const SidebarItem = styled(motion.li).attrs(({ theme }) => ({
    whileHover: {
        borderColor: `${theme.name === `light` ? `rgba(0, 0, 0, 0.1)` : `rgba(255, 255, 255, 0.2)`}`
    }
}))<{ $selected?: boolean }>`
    height: 25px;
    width: 120px;
    margin: 5px 0;
    background-color: ${(props) => (props.$selected ? props.theme.selected : `transparent`)};
    border: 0.1px solid transparent;
    font-size: 12px;
    border-radius: 8px;
    ${flexCenter({ justifyContent: `flex-start` })};
    padding: 10px;
    cursor: pointer;
`

export const SettingsMain = styled.div`
    margin-left: 20px;
    width: 100%;
    height: 100%;
    overflow: scroll;
`

export const SettingsSectionContainer = styled.div`
    height: 100%;
`

export const SettingsSection = styled.div`
    width: 100%;
    margin-bottom: 10px;
`

export const SectionHeading = styled.h2`
    font-size: 16px;
    margin-bottom: 5px;
`
export const SectionBodyGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
`

export const CheckSettingContainer = styled.div`
    ${flexCenter()};
    padding: 5px;
    font-size: 12px;
    margin-left: 10px;
`

export const CheckSettingName = styled.div`
    width: 150px;
`

export const CheckBoxContainer = styled.div`
    height: 20px;
    width: 20px;
    background: ${({ theme }) => (theme.name === `dark` ? theme.shade1 : ``)};
    border: 0.5px solid ${({ theme }) => (theme.name === `light` ? `rgba(0, 0, 0, 0.1)` : ``)};
    border-radius: 4px;
    ${flexCenter()};
    cursor: pointer;

    & > svg {
        height: 15px;
        width: 15px;
        fill: none;
        stroke: ${({ theme }) => theme.text};
        stroke-width: 3px;
    }
`

export const SettingsNumberInputContainer = styled.input`
    background: ${({ theme }) => theme.shade1};
    color: ${({ theme }) => theme.text};
    width: 25px;
    height: 25px;
    ${flexCenter()};
    text-align: center;
    border: none;
    outline: none;
    border-radius: 8px;
    margin: 0 5px;
    font-family: Outfit;
`

export const LogoContainer = styled.div`
    ${flexCenter()};
    height: 75px;
    width: 100%;
`

export const AboutContainer = styled.div`
    ${flexCenter({ flexDirection: `column` })};
    font-size: 12px;
    margin: 0 20px 20px 20px;
    height: 50%;
`

export const LogoTextContainer = styled.div`
    margin-left: 20px;

    & > svg {
        height: 30px;
        fill: ${({ theme }) => theme.text};
    }
`

export const LogoIconContainer = styled.div`
    & > svg {
        height: 50px;
    }
`

export const DangerMiddle = styled.div`
    ${flexCenter()};
`

export const AboutText = styled.p`
    width: 100%;
    text-align: center;
    margin: 5px 0;
`

export const AboutLink = styled.div`
    ${flexCenter()};
    margin-top: 10px;
    width: 100%;
    text-align: center;
    cursor: pointer;

    img {
        height: 20px;
        width: 20px;
        margin-right: 5px;
    }
`

export const SettingsComponentItem = styled(motion.div).attrs(() => ({
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
}))``
