import { AnimatePresence } from 'framer-motion'

import Logo from '@assets/logo/logo.svg'

import NewBlockButton from '@components/NewBlockButton'

import { selectTTShowCurentTime, selectTTShowCurrentBlock } from '@redux/selectors/timetableSelectors'

import { appSidebarOpened } from '@redux/slices/appSlice'
import { useAppDispatch, useAppSelector } from '@redux/store'

import CurrentBlockViewer from './CurrentBlockViewer'
import CurrentTimeViewer from './CurrentTimeViewer'

import * as s from './styles'

const Header = () => {
    const dispatch = useAppDispatch()

    const showCurrentTime = useAppSelector(selectTTShowCurentTime)
    const showCurrentBlock = useAppSelector(selectTTShowCurrentBlock)

    return (
        <s.HeaderContainer>
            <s.LogoContainer onClick={() => dispatch(appSidebarOpened())}>
                <Logo />
            </s.LogoContainer>
            <s.DetailsContainer>
                <AnimatePresence>{showCurrentTime && <CurrentTimeViewer />}</AnimatePresence>
                <div style={{ width: `10px` }} />
                <AnimatePresence>{showCurrentBlock && <CurrentBlockViewer />}</AnimatePresence>
            </s.DetailsContainer>
            <s.ActionsContainer>
                <NewBlockButton />
            </s.ActionsContainer>
        </s.HeaderContainer>
    )
}

export default Header
