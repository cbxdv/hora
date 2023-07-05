import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Modal from '../Modal'
import { useAppDispatch } from '../../redux/store'
import { hideSettings } from '../../redux/slices/appSlice'
import TimetableSettings from './TimetableSettings'
import GeneralSettings from './GeneralsSettings'
import AboutSettings from './AboutSettings'
import * as s from './styles'

const SettingsComponent = () => {
    const dispatch = useAppDispatch()
    const [currentTab, setCurrentTab] = useState<'general' | 'timetable' | 'about'>('general')

    const getCurrentTab = () => {
        switch (currentTab) {
            case 'general':
                return <GeneralSettings />
            case 'timetable':
                return <TimetableSettings />
            case 'about':
                return <AboutSettings />
        }
    }

    return (
        <Modal title='Settings' closeHandler={() => dispatch(hideSettings())} width='50%' height='60%'>
            <s.SettingsContainer>
                <s.SettingsSidebar>
                    <ul>
                        <s.SidebarItem onClick={() => setCurrentTab('general')} $selected={currentTab === 'general'}>
                            General
                        </s.SidebarItem>
                        <s.SidebarItem
                            onClick={() => setCurrentTab('timetable')}
                            $selected={currentTab === 'timetable'}
                        >
                            Timetable
                        </s.SidebarItem>
                        <s.SidebarItem onClick={() => setCurrentTab('about')} $selected={currentTab === 'about'}>
                            About
                        </s.SidebarItem>
                    </ul>
                </s.SettingsSidebar>
                <s.SettingsMain>
                    <AnimatePresence>{getCurrentTab()}</AnimatePresence>
                </s.SettingsMain>
            </s.SettingsContainer>
        </Modal>
    )
}

export default SettingsComponent
