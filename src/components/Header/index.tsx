import { AnimatePresence } from 'framer-motion'

import SettingsIcon from '@assets/icons/Settings.svg'
import Logo from '@assets/logo/logo.svg'

import IconButton from '@components/IconButton'
import NewBlockButton from '@components/NewBlockButton'

import { selectTTShowCurentTime, selectTTShowCurrentBlock } from '@redux/selectors/timetableSelectors'

import { appSettingsOpened } from '@redux/slices/appSlice'
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
            <s.LogoContainer>
                <Logo />
            </s.LogoContainer>
            <s.DetailsContainer>
                <AnimatePresence>{showCurrentTime && <CurrentTimeViewer />}</AnimatePresence>
                <div style={{ width: `10px` }} />
                <AnimatePresence>{showCurrentBlock && <CurrentBlockViewer />}</AnimatePresence>
            </s.DetailsContainer>
            <s.ActionsContainer>
                <NewBlockButton />
                <IconButton Icon={SettingsIcon} size={36} onClick={() => dispatch(appSettingsOpened())} />
            </s.ActionsContainer>
        </s.HeaderContainer>
    )
}

export default Header
