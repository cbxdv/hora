import { useAppDispatch, useAppSelector } from '../../redux/store'
import { changeTheme, selectShowingTheme, selectTheme } from '../../redux/slices/appSlice'
import LightLight from '../../assets/icons/theme/L-light.svg'
import LightDark from '../../assets/icons/theme/L-dark.svg'
import LightSystem from '../../assets/icons/theme/L-system.svg'
import DarkLight from '../../assets/icons/theme/D-light.svg'
import DarkDark from '../../assets/icons/theme/D-dark.svg'
import DarkSystem from '../../assets/icons/theme/D-system.svg'
import LightLightSel from '../../assets/icons/theme/L-light-sel.svg'
import LightDarkSel from '../../assets/icons/theme/L-dark-sel.svg'
import DarkLightSel from '../../assets/icons/theme/D-light-sel.svg'
import DarkDarkSel from '../../assets/icons/theme/D-dark-sel.svg'
import * as s from './styles'

const ThemeSelector = () => {
    const dispatch = useAppDispatch()

    const theme = useAppSelector(selectTheme)
    const showingTheme = useAppSelector(selectShowingTheme)

    return (
        <s.ThemeSelectorContainer>
            <s.ThemeButton $selected={theme === 'light'} onClick={() => dispatch(changeTheme('light'))}>
                <s.ThemeButtonImage>
                    {showingTheme === 'light' ? <LightLight /> : <DarkLight />}
                    {theme === 'light' && (
                        <s.ThemeImageSelected>
                            {showingTheme === 'light' ? <LightLightSel /> : <DarkLightSel />}
                        </s.ThemeImageSelected>
                    )}
                </s.ThemeButtonImage>
                <s.ThemeButtonText>Light</s.ThemeButtonText>
            </s.ThemeButton>
            <s.ThemeButton $selected={theme === 'dark'} onClick={() => dispatch(changeTheme('dark'))}>
                <s.ThemeButtonImage>
                    {showingTheme === 'light' ? <LightDark /> : <DarkDark />}
                    {theme === 'dark' && (
                        <s.ThemeImageSelected>
                            {showingTheme === 'light' ? <LightDarkSel /> : <DarkDarkSel />}
                        </s.ThemeImageSelected>
                    )}
                </s.ThemeButtonImage>
                <s.ThemeButtonText>Dark</s.ThemeButtonText>
            </s.ThemeButton>
            <s.ThemeButton $selected={theme === 'system'} onClick={() => dispatch(changeTheme('system'))}>
                <s.ThemeButtonImage>
                    {showingTheme === 'light' ? <LightSystem /> : <DarkSystem />}
                    {theme === 'system' && (
                        <s.ThemeImageSelected>
                            {showingTheme === 'light' ? <LightDarkSel /> : <DarkDarkSel />}
                        </s.ThemeImageSelected>
                    )}
                </s.ThemeButtonImage>
                <s.ThemeButtonText>Follow OS</s.ThemeButtonText>
            </s.ThemeButton>
        </s.ThemeSelectorContainer>
    )
}

export default ThemeSelector
