import { MouseEvent } from 'react'

import SettingsIcon from '@assets/icons/Settings.svg'
import TimetableIcon from '@assets/icons/Timetable.svg'
import Logo from '@assets/logo/logo.svg'
import LogoText from '@assets/logo/text.svg'

import IconButton from '@components/IconButton'

import { appSettingsOpened, appSidebarClosed } from '@redux/slices/appSlice'
import { useAppDispatch } from '@redux/store'

import * as s from './styles'

const Sidebar = () => {
    const dispatch = useAppDispatch()

    return (
        <s.SidebarDrop onClick={() => dispatch(appSidebarClosed())}>
            <s.SidebarContainer onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
                <s.TopContainer>
                    <s.LogoContainer>
                        <Logo />
                        <s.LogoTextContainer>
                            <LogoText />
                        </s.LogoTextContainer>
                    </s.LogoContainer>
                </s.TopContainer>
                <s.SidebarContent>
                    <SidebarItem Icon={TimetableIcon} text='Timetable' />
                </s.SidebarContent>
                <s.BottomContainer>
                    <IconButton Icon={SettingsIcon} text='Settings' onClick={() => dispatch(appSettingsOpened())} />
                </s.BottomContainer>
            </s.SidebarContainer>
        </s.SidebarDrop>
    )
}

const SidebarItem: React.FC<SidebarItemProps> = ({ Icon, text }) => {
    return (
        <s.SidebarItemContainer onClick={() => {}}>
            <s.SidebarItemIconContainer>
                <Icon />
            </s.SidebarItemIconContainer>
            <s.SidebarItemTextContainer>{text}</s.SidebarItemTextContainer>
        </s.SidebarItemContainer>
    )
}

type SidebarItemProps = {
    Icon: React.FunctionComponent
    text: string
}

export default Sidebar
