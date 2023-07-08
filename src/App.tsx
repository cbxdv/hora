import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import { ThemeProvider, styled } from 'styled-components'

import BlockForm from '@components/BlockForm'
import Header from '@components/Header'
import Loader from '@components/Loader'
import SettingsComponent from '@components/SettingsComponent'
import SubstitutionForm from '@components/SubstitutionForm'
import WeekViewer from '@components/WeekViewer'

import {
    appStarted,
    selectIsLoading,
    selectIsSettingsVisible,
    selectShowingTheme,
    showSettings,
    toggleTheme
} from '@redux/slices/appSlice'
import { showBlockForm, selectIsBlockFormVisible, selectIsSubFormVisible } from '@redux/slices/timetableSlice'
import { useAppDispatch, useAppSelector } from '@redux/store'

import GlobalStyles from '@styles/globalStyles'
import { lightThemeColors, darkThemeColors } from '@styles/styleConstants'
import '@styles/fonts.css'

import { stopNS } from '@utils/notificationsUtils'

const App = () => {
    const dispatch = useAppDispatch()
    const theme = useAppSelector(selectShowingTheme)

    const isLoading = useAppSelector(selectIsLoading)

    useEffect(() => {
        dispatch(appStarted())
        return () => {
            stopNS()
        }
    }, [])

    console.log(theme)

    return (
        <AnimatePresence>
            {isLoading ? (
                <Loader />
            ) : (
                <ThemeProvider theme={theme === `light` ? lightThemeColors : darkThemeColors}>
                    <GlobalStyles />
                    <ModalsContainer />
                    <AppMain>
                        <Header />
                        <WeekViewer />
                    </AppMain>
                </ThemeProvider>
            )}
        </AnimatePresence>
    )
}

const ModalsContainer = () => {
    const dispatch = useAppDispatch()

    const isBlockFormVisible = useAppSelector(selectIsBlockFormVisible)
    const isSettingsVisible = useAppSelector(selectIsSettingsVisible)
    const isSubFormVisible = useAppSelector(selectIsSubFormVisible)

    const keyBindHandler = (event: KeyboardEvent) => {
        if (isBlockFormVisible || isSettingsVisible) {
            return
        }
        if (!event.ctrlKey) {
            return
        }
        switch (event.key.toLowerCase()) {
            case `a`:
                dispatch(showBlockForm())
                break
            case `i`:
                dispatch(showSettings())
                break
            case `l`:
                dispatch(toggleTheme())
                break
        }
    }

    useEffect(() => {
        window.addEventListener(`keydown`, keyBindHandler)
        return () => {
            window.removeEventListener(`keydown`, keyBindHandler)
        }
    }, [isBlockFormVisible, isSettingsVisible, isSubFormVisible])

    return (
        <AnimatePresence>
            {isBlockFormVisible && <BlockForm />}
            {isSettingsVisible && <SettingsComponent />}
            {isSubFormVisible && <SubstitutionForm />}
        </AnimatePresence>
    )
}

const AppMain = styled(motion.div).attrs(() => ({
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { delayChildren: 0.3 } },
    exit: { opacity: 0 },
    transition: { duration: 0.2 }
}))`
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
`

export default App
