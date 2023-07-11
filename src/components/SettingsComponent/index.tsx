import { AnimatePresence } from 'framer-motion'
import React, { useState } from 'react'

import Modal from '@components/Modal'

import { appSettingsClosed } from '@redux/slices/appSlice'
import { useAppDispatch } from '@redux/store'

import AboutSettings from './AboutSettings'
import GeneralSettings from './GeneralsSettings'
import * as s from './styles'
import TimetableSettings from './TimetableSettings'

/**
 * Settings Components
 */
const SC: { [key: string]: React.ReactElement } = {
    General: <GeneralSettings />,
    Timetable: <TimetableSettings />,
    About: <AboutSettings />
}

const SettingsComponent = () => {
    const dispatch = useAppDispatch()
    const [currentTab, setCurrentTab] = useState<string>(Object.keys(SC)[0])

    return (
        <Modal title='Settings' closeHandler={() => dispatch(appSettingsClosed())} width='650px' height='420px'>
            <s.SettingsContainer>
                <s.SettingsSidebar>
                    <ul>
                        {Object.keys(SC).map(scItem => (
                            <s.SidebarItem
                                key={scItem}
                                onClick={() => setCurrentTab(scItem)}
                                $selected={currentTab === scItem}
                            >
                                {scItem.toString()}
                            </s.SidebarItem>
                        ))}
                    </ul>
                </s.SettingsSidebar>
                <s.SettingsMain>
                    <AnimatePresence initial={false}>{SC[currentTab]}</AnimatePresence>
                </s.SettingsMain>
            </s.SettingsContainer>
        </Modal>
    )
}

export default SettingsComponent
