import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

import { DayID } from '@appTypes/TimeBlockInterfaces'

import ArrowDownIcon from '@assets/icons/ArrowDown.svg'

import Modal from '@components/Modal'
import TextButton from '@components/TextButton'
import ValueDropdown from '@components/ValueDropdown'

import { hideSubstitutionForm, selectDayToBeOpenSubForm, ttDaySubAdded } from '@redux/slices/timetableSlice'
import { useAppDispatch, useAppSelector } from '@redux/store'

import { dayDropItems } from '@utils/timetableUtils'

import * as s from './styles'

const SubstitutionForm = () => {
    const dispatch = useAppDispatch()

    const dayToBeOpenForm = useAppSelector(selectDayToBeOpenSubForm)

    const [subWith, setSubWith] = useState<DayID>(1)
    const [subTo, setSubTo] = useState<DayID>(2)

    const [isSrcDDVisible, setIsSrcDDVisible] = useState<boolean>(false)
    const [isDestDDVisible, setIsDestDDVisible] = useState<boolean>(false)

    const submitHandler = () => {
        if (subWith === subTo) {
            return
        }
        dispatch(
            ttDaySubAdded({
                subTo,
                subWith
            })
        )
    }

    useEffect(() => {
        if (dayToBeOpenForm !== null) {
            setSubTo(dayToBeOpenForm)
            setSubWith((dayToBeOpenForm + 1) % 7)
        }
    }, [])

    return (
        <Modal title='Substitution' closeHandler={() => dispatch(hideSubstitutionForm())}>
            <div>
                <s.BodySectionContainer>
                    <s.InputContainer>
                        <s.InputName>Substitute to</s.InputName>
                        <s.InputValue>
                            <span style={{ letterSpacing: `0.5px` }}>{DayID[subTo]}</span>
                            <s.InputValueArrowContainer
                                $isVisible={isDestDDVisible}
                                onClick={() => setIsDestDDVisible(prev => !prev)}
                            >
                                <ArrowDownIcon />
                            </s.InputValueArrowContainer>
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
                        </s.InputValue>
                    </s.InputContainer>
                    <s.InputContainer>
                        <s.InputName>Use blocks from</s.InputName>
                        <s.InputValue>
                            <span style={{ letterSpacing: `0.5px` }}>{DayID[subWith]}</span>
                            <s.InputValueArrowContainer
                                $isVisible={isSrcDDVisible}
                                onClick={() => setIsSrcDDVisible(prev => !prev)}
                            >
                                <ArrowDownIcon />
                            </s.InputValueArrowContainer>
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
                        </s.InputValue>
                    </s.InputContainer>
                </s.BodySectionContainer>
                <s.ActionsContainer>
                    <s.ButtonContainer>
                        <TextButton text='Discard' onClick={() => dispatch(hideSubstitutionForm())} danger />
                    </s.ButtonContainer>
                    <s.ButtonContainer>
                        <TextButton text='Create' onClick={submitHandler} />
                    </s.ButtonContainer>
                </s.ActionsContainer>
            </div>
        </Modal>
    )
}

export default SubstitutionForm
