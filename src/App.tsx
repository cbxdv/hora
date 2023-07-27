import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { ThemeProvider, styled } from 'styled-components'

import BlockForm from '@components/BlockForm'
import Header from '@components/Header'
import Loader from '@components/Loader'
import SettingsComponent from '@components/SettingsComponent'
import SubstitutionForm from '@components/SubstitutionForm'
import { ToastsContainer } from '@components/Toast'
import WeekViewer from '@components/WeekViewer'

import { ConfirmDialogProvider } from '@hooks/useConfirm'

import {
    selectAppTheme,
    selectIsAppLoading,
    selectIsAppSettingsVisible,
    selectShowingTheme
} from '@redux/selectors/appSelectors'
import { selectIsTTBlockFormVisible, selectIsTTSubFormVisible } from '@redux/selectors/timetableSelectors'
import { appSettingsOpened, appStarted, appThemeToggled, toastAdded } from '@redux/slices/appSlice'
import { ttBlockFormedOpened, ttSubFormOpened } from '@redux/slices/timetableSlice'
import { useAppDispatch, useAppSelector } from '@redux/store'

import GlobalStyles from '@styles/globalStyles'
import { lightThemeColors, darkThemeColors } from '@styles/styleConstants'
import '@styles/fonts.css'

import { stopAllServiceTimers } from '@utils/serviceUtils'
import { AppThemes, ToastTypes } from '@appTypes/AppInterfaces'

const App = () => {
    const dispatch = useAppDispatch()
    const theme = useAppSelector(selectShowingTheme)

    const isLoading = useAppSelector(selectIsAppLoading)

    const startApp = () => {
        dispatch(appStarted())
    }

    useEffect(() => {
        const contextMenuHandler = (event: MouseEvent) => event.preventDefault()
        startApp()
        document.addEventListener(`contextmenu`, contextMenuHandler)
        return () => {
            stopAllServiceTimers()
            document.removeEventListener(`contextmenu`, contextMenuHandler)
        }
    }, [])

    return (
        <AnimatePresence>
            {isLoading ? (
                <Loader />
            ) : (
                <ThemeProvider theme={theme === `light` ? lightThemeColors : darkThemeColors}>
                    <ConfirmDialogProvider>
                        <GlobalStyles />
                        <AppWrapper>
                            <AppMain>
                                <Header />
                                <WeekViewer />
                            </AppMain>
                        </AppWrapper>
                    </ConfirmDialogProvider>
                </ThemeProvider>
            )}
        </AnimatePresence>
    )
}

const AppWrapper = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useAppDispatch()

    const isBlockFormVisible = useAppSelector(selectIsTTBlockFormVisible)
    const isSettingsVisible = useAppSelector(selectIsAppSettingsVisible)
    const isSubFormVisible = useAppSelector(selectIsTTSubFormVisible)
    const appTheme = useAppSelector(selectAppTheme)

    useEffect(() => {
        const keyBindHandler = (event: KeyboardEvent) => {
            if (event.ctrlKey && event.key.toLowerCase() === `l`) {
                if (appTheme === AppThemes.System) {
                    dispatch(toastAdded({ message: 'Theme follows the System Theme', type: ToastTypes.Warn }))
                    return
                }
                dispatch(appThemeToggled())
                return
            }
            if (isBlockFormVisible || isSettingsVisible) {
                return
            }
            if (!event.ctrlKey) {
                return
            }
            switch (event.key.toLowerCase()) {
                case `a`:
                    dispatch(ttBlockFormedOpened())
                    break
                case `i`:
                    dispatch(appSettingsOpened())
                    break
                case `s`:
                    dispatch(ttSubFormOpened())
                    break
            }
        }

        window.addEventListener(`keydown`, keyBindHandler)
        return () => {
            window.removeEventListener(`keydown`, keyBindHandler)
        }
    }, [isBlockFormVisible, isSettingsVisible, isSubFormVisible])

    return (
        <>
            <AnimatePresence>
                {isBlockFormVisible && <BlockForm />}
                {isSettingsVisible && <SettingsComponent />}
                {isSubFormVisible && <SubstitutionForm />}
            </AnimatePresence>
            <ConfirmDialogProvider>{children}</ConfirmDialogProvider>
            <ToastsContainer />
        </>
    )
}

const AppMain = styled(motion.div).attrs(() => ({
    initial: { opacity: 0 },
    animate: { opacity: 1 },
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
