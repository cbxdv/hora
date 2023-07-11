import { AppThemes, Themes } from '@appTypes/AppInterfaces'

import { ReactComponent as DarkDarkSel } from '@assets/icons/theme/D-dark-sel.svg'
import { ReactComponent as DarkDark } from '@assets/icons/theme/D-dark.svg'
import { ReactComponent as DarkLightSel } from '@assets/icons/theme/D-light-sel.svg'
import { ReactComponent as DarkLight } from '@assets/icons/theme/D-light.svg'
import { ReactComponent as DarkSystem } from '@assets/icons/theme/D-system.svg'
import { ReactComponent as LightDarkSel } from '@assets/icons/theme/L-dark-sel.svg'
import { ReactComponent as LightDark } from '@assets/icons/theme/L-dark.svg'
import { ReactComponent as LightLightSel } from '@assets/icons/theme/L-light-sel.svg'
import { ReactComponent as LightLight } from '@assets/icons/theme/L-light.svg'
import { ReactComponent as LightSystem } from '@assets/icons/theme/L-system.svg'

import { selectShowingTheme, selectAppTheme } from '@redux/selectors/appSelectors'
import { appThemeChanged } from '@redux/slices/appSlice'
import { useAppDispatch, useAppSelector } from '@redux/store'

import * as s from './styles'

const ThemeSelector = () => {
    const dispatch = useAppDispatch()

    const theme = useAppSelector(selectAppTheme)
    const showingTheme = useAppSelector(selectShowingTheme)

    return (
        <s.ThemeSelectorContainer>
            <s.ThemeButton
                $selected={theme === AppThemes.Light}
                onClick={() => dispatch(appThemeChanged(AppThemes.Light))}
            >
                <s.ThemeButtonImage>
                    {showingTheme === Themes.Light ? <LightLight /> : <DarkLight />}
                    {theme === AppThemes.Light && (
                        <s.ThemeImageSelected>
                            {showingTheme === Themes.Light ? <LightLightSel /> : <DarkLightSel />}
                        </s.ThemeImageSelected>
                    )}
                </s.ThemeButtonImage>
                <s.ThemeButtonText>Light</s.ThemeButtonText>
            </s.ThemeButton>
            <s.ThemeButton
                $selected={theme === AppThemes.Dark}
                onClick={() => dispatch(appThemeChanged(AppThemes.Dark))}
            >
                <s.ThemeButtonImage>
                    {showingTheme === Themes.Light ? <LightDark /> : <DarkDark />}
                    {theme === AppThemes.Dark && (
                        <s.ThemeImageSelected>
                            {showingTheme === Themes.Light ? <LightDarkSel /> : <DarkDarkSel />}
                        </s.ThemeImageSelected>
                    )}
                </s.ThemeButtonImage>
                <s.ThemeButtonText>Dark</s.ThemeButtonText>
            </s.ThemeButton>
            <s.ThemeButton
                $selected={theme === AppThemes.System}
                onClick={() => dispatch(appThemeChanged(AppThemes.System))}
            >
                <s.ThemeButtonImage>
                    {showingTheme === Themes.Light ? <LightSystem /> : <DarkSystem />}
                    {theme === AppThemes.System && (
                        <s.ThemeImageSelected>
                            {showingTheme === Themes.Light ? <LightDarkSel /> : <DarkDarkSel />}
                        </s.ThemeImageSelected>
                    )}
                </s.ThemeButtonImage>
                <s.ThemeButtonText>Follow OS</s.ThemeButtonText>
            </s.ThemeButton>
        </s.ThemeSelectorContainer>
    )
}

export default ThemeSelector
