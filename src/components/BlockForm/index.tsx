import React, { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import TextButton from '../TextButton'
import { IBlockTime, ITimeBlockBase, dayIdTypes } from '../../@types/TimeBlockInterfaces'
import Modal from '../Modal'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import SubjectIcon from '../../assets/icons/Subject.svg'
import ArrowDownIcon from '../../assets/icons/ArrowDown.svg'
import {
    blockAdded,
    blockDeleted,
    blockUpdated,
    hideBlockForm,
    selectDuplicateBlock,
    selectFormCache,
    selectSelectedBlock
} from '../../redux/slices/timetableSlice'
import { convertDayIdToName, getAmPm, hours12To24, hours24To12 } from '../../utilities/blockTimeUtils'
import ValueDropdown, { ValueDropdownItemType } from '../ValueDropdown'
import ColorSelector from '../ColorSelector'
import TimeSelector from '../TimeSelector'
import * as s from './styles'

const BlockForm = () => {
    const dispatch = useAppDispatch()

    const oldBlock = useAppSelector(selectSelectedBlock)
    const duplicateBlock = useAppSelector(selectDuplicateBlock)
    const formCache = useAppSelector(selectFormCache)
    const subjects = formCache.subjects
    const subjectList: ValueDropdownItemType[] = subjects.map((subject, index) => ({
        name: subject.title,
        value: index
    }))

    const [title, setTitle] = useState<string>('')
    const [day, setDay] = useState<dayIdTypes>(1)
    const [color, setColor] = useState<string>('#FFADAD')
    const [description, setDescription] = useState<string>('')
    const [startHours, setStartHours] = useState<number>(8)
    const [startMinutes, setStartMinutes] = useState<number>(0)
    const [startAmpm, setStartAmpm] = useState<'am' | 'pm'>('am')
    const [endHours, setEndHours] = useState<number>(9)
    const [endMinutes, setEndMinutes] = useState<number>(0)
    const [endAmpm, setEndAmpm] = useState<'am' | 'pm'>('am')

    const [isDayDDVisible, setIsDayDDVisible] = useState<boolean>(false)
    const [isColorDDVisible, setIsColorDDVisible] = useState<boolean>(false)
    const [isStartTimeDDVisible, setIsStartTimeDDVisible] = useState<boolean>(false)
    const [isEndTimeDDVisible, setIsEndTimeDDVisible] = useState<boolean>(false)

    const [filteredSubjects, setFilteredSubjects] = useState<ValueDropdownItemType[]>([])
    const [isTitleDDVisible, setIsSubjectDDVisible] = useState<boolean>(false)
    const [selectedSubjectIndex, setSelectedSubjectIndex] = useState<number | null>(null)

    const checkIsInvalid = () => {
        if (title.length === 0) {
            return true
        }
        if (startAmpm === 'pm' && endAmpm === 'am') {
            return true
        }
        if (startHours > endHours) {
            if (startAmpm === 'pm' && endAmpm === 'am') {
                return true
            }
        }
        if (startHours === endHours && endMinutes - startMinutes < 15) {
            return true
        }
        return false
    }

    const createHandler = () => {
        if (checkIsInvalid()) {
            return
        }
        const newBlock: ITimeBlockBase = {
            title: title.trim(),
            day,
            color,
            description: description.trim(),
            startTime: {
                hours: hours12To24(startHours, startAmpm),
                minutes: startMinutes
            },
            endTime: {
                hours: hours12To24(endHours, endAmpm),
                minutes: endMinutes
            }
        }
        dispatch(blockAdded(newBlock))
    }

    const editHandler = () => {
        if (title.length === 0) {
            return
        }
        if (oldBlock == null) {
            return
        }
        const newBlock = {
            ...oldBlock,
            title: title.trim(),
            day,
            color,
            description: description.trim(),
            startTime: {
                hours: hours12To24(startHours, startAmpm),
                minutes: startMinutes
            },
            endTime: {
                hours: hours12To24(endHours, endAmpm),
                minutes: endMinutes
            }
        }
        const data = { oldBlock, newBlock }
        dispatch(blockUpdated(data))
    }

    const submitHandler = () => (oldBlock ? editHandler() : createHandler())

    const dangerButtonHandler = () => {
        if (oldBlock) {
            dispatch(blockDeleted({ day: oldBlock.day, id: oldBlock.id }))
        } else {
            dispatch(hideBlockForm())
        }
    }

    const setBlockTimeInState = (time: IBlockTime, type: 'start' | 'end') => {
        if (type === 'start') {
            setStartHours(hours24To12(time.hours))
            setStartMinutes(time.minutes)
            setStartAmpm(getAmPm(time.hours))
        } else if (type === 'end') {
            setEndHours(hours24To12(time.hours))
            setEndMinutes(time.minutes)
            setEndAmpm(getAmPm(time.hours))
        }
    }

    useEffect(() => {
        const blockToUse = oldBlock || duplicateBlock
        if (blockToUse) {
            setTitle(blockToUse.title)
            setDay(blockToUse.day)
            setColor(blockToUse.color)
            setDescription(blockToUse.description)
            setBlockTimeInState(blockToUse.startTime, 'start')
            setBlockTimeInState(blockToUse.endTime, 'end')
        } else {
            if (formCache.day) setDay(formCache.day)
            if (formCache.startTime) setBlockTimeInState(formCache.startTime, 'start')
            if (formCache.endTime) setBlockTimeInState(formCache.endTime, 'end')
        }

        // Initially use all subjects
        setFilteredSubjects(subjectList)
    }, [])

    // Filter subjects whenever there the title updates
    useEffect(() => {
        if (title.length !== 0) {
            setIsSubjectDDVisible(true)
        } else {
            setIsSubjectDDVisible(false)
        }
        setFilteredSubjects(subjectList.filter((s) => s.name.toLowerCase().includes(title.toLowerCase())))
        if (selectedSubjectIndex !== null) {
            const selSub = subjects[selectedSubjectIndex]
            if (title !== selSub.title) {
                setSelectedSubjectIndex(null)
            }
        }
    }, [title])

    const dayDropItems = [
        { name: 'Monday', value: 1 },
        { name: 'Tuesday', value: 2 },
        { name: 'Wednesday', value: 3 },
        { name: 'Thursday', value: 4 },
        { name: 'Friday', value: 5 },
        { name: 'Saturday', value: 6 },
        { name: 'Sunday', value: 0 }
    ]

    const substituteSubject = (id: number) => {
        // Retrieving the subject using id
        const newlySelectedSubject = subjects[id]

        // Setting the selected subject index
        setSelectedSubjectIndex(id)

        // Setting the selected subjects attributes in the form
        setTitle(newlySelectedSubject.title)
        setDescription(newlySelectedSubject.description)
        setColor(newlySelectedSubject.color)
    }

    return (
        <Modal closeHandler={() => dispatch(hideBlockForm())}>
            <s.BlockFormContainer>
                <div>
                    <s.TitleContainer>
                        <s.TitleIconContainer onClick={() => setIsSubjectDDVisible(true)}>
                            <SubjectIcon />
                        </s.TitleIconContainer>
                        <s.TitleInput
                            value={title}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                            autoFocus
                        />
                        {title.length === 0 && <s.TitlePlaceholder>Enter a title</s.TitlePlaceholder>}
                    </s.TitleContainer>
                    <s.SubjectContainer>
                        <AnimatePresence>
                            {isTitleDDVisible && (
                                <ValueDropdown
                                    selected={selectedSubjectIndex}
                                    items={filteredSubjects}
                                    selectHandler={(value: number) => substituteSubject(value)}
                                    closeHandler={() => setIsSubjectDDVisible(false)}
                                />
                            )}
                        </AnimatePresence>
                    </s.SubjectContainer>
                </div>
                <s.BodySectionContainer>
                    {/* Day input */}
                    <s.InputContainer>
                        <s.InputName>Day</s.InputName>
                        <s.InputValue>
                            {convertDayIdToName(day)}
                            <s.InputValueArrowContainer
                                $isVisible={isDayDDVisible}
                                onClick={() => setIsDayDDVisible(!isDayDDVisible)}
                            >
                                <ArrowDownIcon />
                            </s.InputValueArrowContainer>
                            <AnimatePresence>
                                {isDayDDVisible && (
                                    <ValueDropdown
                                        selected={day}
                                        items={dayDropItems}
                                        selectHandler={(value: number) => setDay(value as dayIdTypes)}
                                        closeHandler={() => setIsDayDDVisible(false)}
                                    />
                                )}
                            </AnimatePresence>
                        </s.InputValue>
                    </s.InputContainer>

                    {/* Start time input */}
                    <s.InputContainer>
                        <s.InputName>Start Time</s.InputName>
                        <s.InputValue>
                            <span style={{ letterSpacing: '0.5px' }}>
                                {startHours.toString().padStart(2, '0')}:{startMinutes.toString().padStart(2, '0')}{' '}
                                {startAmpm}
                            </span>
                            <s.InputValueArrowContainer
                                $isVisible={isStartTimeDDVisible}
                                onClick={() => setIsStartTimeDDVisible(!isStartTimeDDVisible)}
                            >
                                <ArrowDownIcon />
                            </s.InputValueArrowContainer>
                            <AnimatePresence>
                                {isStartTimeDDVisible && (
                                    <TimeSelector
                                        hours={startHours}
                                        setHours={setStartHours}
                                        minutes={startMinutes}
                                        setMinutes={setStartMinutes}
                                        ampm={startAmpm}
                                        setAmpm={setStartAmpm}
                                        closeHandler={() => setIsStartTimeDDVisible(false)}
                                    />
                                )}
                            </AnimatePresence>
                        </s.InputValue>
                    </s.InputContainer>

                    {/* End time input */}
                    <s.InputContainer>
                        <s.InputName>End Time</s.InputName>
                        <s.InputValue onClick={() => setIsEndTimeDDVisible(true)}>
                            <span style={{ letterSpacing: '0.5px' }}>
                                {endHours.toString().padStart(2, '0')}:{endMinutes.toString().padStart(2, '0')}{' '}
                                {endAmpm}
                            </span>
                            <s.InputValueArrowContainer $isVisible={isEndTimeDDVisible}>
                                <ArrowDownIcon />
                            </s.InputValueArrowContainer>
                            <AnimatePresence>
                                {isEndTimeDDVisible && (
                                    <TimeSelector
                                        hours={endHours}
                                        setHours={setEndHours}
                                        minutes={endMinutes}
                                        setMinutes={setEndMinutes}
                                        ampm={endAmpm}
                                        setAmpm={setEndAmpm}
                                        closeHandler={() => setIsEndTimeDDVisible(false)}
                                    />
                                )}
                            </AnimatePresence>
                        </s.InputValue>
                    </s.InputContainer>

                    {/* Block color input */}
                    <s.InputContainer>
                        <s.InputName>Color</s.InputName>
                        <s.InputValue>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <s.ColorIndicator $color={color} />
                                <div style={{ height: '100%', fontSize: '12px' }}>{color}</div>
                            </div>
                            <s.InputValueArrowContainer
                                $isVisible={isColorDDVisible}
                                onClick={() => setIsColorDDVisible(!isColorDDVisible)}
                            >
                                <ArrowDownIcon />
                            </s.InputValueArrowContainer>
                            <AnimatePresence>
                                {isColorDDVisible && (
                                    <ColorSelector
                                        selected={color}
                                        changeHandler={(selectedColor: string) => setColor(selectedColor)}
                                        closeHandler={() => setIsColorDDVisible(false)}
                                    />
                                )}
                            </AnimatePresence>
                        </s.InputValue>
                    </s.InputContainer>
                </s.BodySectionContainer>

                {/* Block description input */}
                <s.DescriptionContainer>
                    <s.DescriptionInput
                        value={description}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                    />
                    {description.length === 0 && (
                        <s.DescriptionPlaceholder>Enter a description</s.DescriptionPlaceholder>
                    )}
                </s.DescriptionContainer>

                <s.ActionsContainer>
                    <s.ButtonContainer>
                        <TextButton text={oldBlock ? 'Delete' : 'Discard'} onClick={dangerButtonHandler} danger />
                    </s.ButtonContainer>
                    <s.ButtonContainer>
                        <TextButton text={oldBlock ? `Edit` : `Create`} onClick={submitHandler} />
                    </s.ButtonContainer>
                </s.ActionsContainer>
            </s.BlockFormContainer>
        </Modal>
    )
}

export default BlockForm
