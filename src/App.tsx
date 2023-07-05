import { useEffect } from 'react'
import { ThemeProvider, styled } from 'styled-components'
import GlobalStyles from './styles/globalStyles'
import { lightThemeColors, darkThemeColors } from './styles/styleConstants'
import WeekViewer from './components/WeekViewer'
import Header from './components/Header'
import BlockForm from './components/BlockForm'
import SettingsComponent from './components/SettingsComponent'
import { showBlockForm, selectIsBlockFormVisible } from './redux/slices/timetableSlice'
import { useAppDispatch, useAppSelector } from './redux/store'
import {
    appStarted,
    selectIsLoading,
    selectIsSettingsVisible,
    selectShowingTheme,
    showSettings,
    toggleTheme
} from './redux/slices/appSlice'
import './styles/fonts.css'
import { stopNS } from './utilities/notificationsUtils'
import Loader from './components/Loader'

const App = () => {
    const dispatch = useAppDispatch()
    const theme = useAppSelector(selectShowingTheme)

    const isLoading = useAppSelector(selectIsLoading)

    useEffect(() => {
        dispatch(appStarted()),
            () => {
                stopNS()
            }
    }, [])

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <ThemeProvider theme={theme === 'light' ? lightThemeColors : darkThemeColors}>
                    <GlobalStyles />
                    <ModalsContainer />
                    <AppMain>
                        <Header />
                        <WeekViewer />
                    </AppMain>
                </ThemeProvider>
            )}
        </>
    )
}

const ModalsContainer = () => {
    const dispatch = useAppDispatch()

    const isBlockFormVisible = useAppSelector(selectIsBlockFormVisible)
    const isSettingsVisible = useAppSelector(selectIsSettingsVisible)

    const keyBindHandler = (event: KeyboardEvent) => {
        if (isBlockFormVisible || isSettingsVisible) {
            return
        }
        switch (event.key.toLowerCase()) {
            case 'a':
                dispatch(showBlockForm())
                break
            case 'i':
                dispatch(showSettings())
                break
            case 'l':
                event.ctrlKey && dispatch(toggleTheme())
                break
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', keyBindHandler)
        return () => {
            window.removeEventListener('keydown', keyBindHandler)
        }
    }, [])

    return (
        <>
            {isBlockFormVisible && <BlockForm />}
            {isSettingsVisible && <SettingsComponent />}
        </>
    )
}

const AppMain = styled.div`
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
`

export default App
