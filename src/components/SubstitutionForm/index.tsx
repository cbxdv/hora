import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

import { DayID } from '@appTypes/TimeBlockInterfaces'

import { ReactComponent as ArrowDownIcon } from '@assets/icons/ArrowDown.svg'

import Modal from '@components/Modal'
import TextButton from '@components/TextButton'
import ValueDropdown from '@components/ValueDropdown'

import { selectTTDayToBeOpenSubForm } from '@redux/selectors/timetableSelectors'
import { ttSubDayAdded, ttSubFormClosed } from '@redux/slices/timetableSlice'
import { useAppDispatch, useAppSelector } from '@redux/store'

import * as fs from '@styles/formStyles'

import { dayDropItems } from '@utils/timetableUtils'

const SubstitutionForm = () => {
    const dispatch = useAppDispatch()

    const dayToBeOpenForm = useAppSelector(selectTTDayToBeOpenSubForm)

    const [subWith, setSubWith] = useState<DayID>(1)
    const [subTo, setSubTo] = useState<DayID>(2)

    const [isSrcDDVisible, setIsSrcDDVisible] = useState<boolean>(false)
    const [isDestDDVisible, setIsDestDDVisible] = useState<boolean>(false)

    const submitHandler = () => {
        if (subWith === subTo) {
            return
        }
        dispatch(
            ttSubDayAdded({
                subTo,
                subWith
            })
        )
    }

    useEffect(() => {
        if (dayToBeOpenForm != null) {
            setSubTo(dayToBeOpenForm)
            setSubWith((dayToBeOpenForm + 1) % 7)
        }
    }, [dayToBeOpenForm])

    return (
        <Modal title='Substitution' closeHandler={() => dispatch(ttSubFormClosed())}>
            <div>
                <fs.BodySectionContainer>
                    <fs.InputContainer>
                        <fs.InputName>Substitute to</fs.InputName>
                        <fs.InputValue>
                            <span>{DayID[subTo]}</span>
                            <fs.InputValueArrowContainer
                                $isVisible={isDestDDVisible}
                                onClick={() => setIsDestDDVisible(prev => !prev)}
                            >
                                <ArrowDownIcon />
                            </fs.InputValueArrowContainer>
                            <AnimatePresence>
                                {isDestDDVisible && (
                                    <ValueDropdown
                                        closeHandler={() => setIsDestDDVisible(false)}
                                        items={dayDropItems}
                                        selectHandler={val => setSubTo(val)}
                                        selected={subTo}
                                    />
                                )}
                            </AnimatePresence>
                        </fs.InputValue>
                    </fs.InputContainer>
                    <fs.InputContainer>
                        <fs.InputName>Use blocks from</fs.InputName>
                        <fs.InputValue>
                            <span>{DayID[subWith]}</span>
                            <fs.InputValueArrowContainer
                                $isVisible={isSrcDDVisible}
                                onClick={() => setIsSrcDDVisible(prev => !prev)}
                            >
                                <ArrowDownIcon />
                            </fs.InputValueArrowContainer>
                            <AnimatePresence>
                                {isSrcDDVisible && (
                                    <ValueDropdown
                                        closeHandler={() => setIsSrcDDVisible(false)}
                                        items={dayDropItems}
                                        selectHandler={val => setSubWith(val)}
                                        selected={subWith}
                                    />
                                )}
                            </AnimatePresence>
                        </fs.InputValue>
                    </fs.InputContainer>
                </fs.BodySectionContainer>
                <fs.ActionsContainer>
                    <fs.ButtonContainer>
                        <TextButton text='Discard' onClick={() => dispatch(ttSubFormClosed())} danger />
                    </fs.ButtonContainer>
                    <fs.ButtonContainer>
                        <TextButton text='Create' onClick={submitHandler} />
                    </fs.ButtonContainer>
                </fs.ActionsContainer>
            </div>
        </Modal>
    )
}

export default SubstitutionForm
