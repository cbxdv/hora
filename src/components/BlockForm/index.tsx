import { AnimatePresence } from 'framer-motion'
import { ChangeEvent, useEffect, useReducer } from 'react'

import { DayID } from '@appTypes/TimeBlockInterfaces'

import ArrowDownIcon from '@assets/icons/ArrowDown.svg'
import SubjectIcon from '@assets/icons/Subject.svg'

import ColorSelector from '@components/ColorSelector'
import Modal from '@components/Modal'
import TextButton from '@components/TextButton'
import TimeSelector from '@components/TimeSelector'
import ValueDropdown, { ValueDropdownItemType } from '@components/ValueDropdown'

import { hideBlockForm, selectDuplicateBlock, selectFormCache, selectSelectedBlock } from '@redux/slices/timetableSlice'
import { useAppDispatch, useAppSelector } from '@redux/store'

import blockFormReducer, { createBlockFormIS, blockFormActions as fa } from './reducer'
import * as s from './styles'
import { createHandler, dangerButtonHandler, editHandler } from './utils'

const BlockForm = () => {
    const appDispatch = useAppDispatch()

    const oldBlock = useAppSelector(selectSelectedBlock)
    const duplicateBlock = useAppSelector(selectDuplicateBlock)
    const formCache = useAppSelector(selectFormCache)
    const subjects = formCache.subjects
    const subjectList: ValueDropdownItemType[] = subjects.map((subject, index) => ({
        name: subject.title,
        value: index
    }))

    const [state, formDispatch] = useReducer(
        blockFormReducer,
        { oldBlock, duplicateBlock, formCache },
        createBlockFormIS
    )

    const submitHandler = () =>
        oldBlock ? editHandler(state, oldBlock, appDispatch) : createHandler(state, appDispatch)

    // Filter subjects whenever there the title updates
    useEffect(() => {
        if (state.title.length !== 0) {
            formDispatch(fa.showSubjectDD())
        } else {
            formDispatch(fa.hideSubjectDD())
        }
        const filtered = subjectList.filter(s => s.name.toLowerCase().includes(state.title.toLowerCase()))
        formDispatch(fa.setFilteredSub(filtered))
        if (state.selectedSubjectIndex !== null) {
            const selSub = subjects[state.selectedSubjectIndex]
            if (state.title !== selSub.title) {
                formDispatch(fa.setSelSubIndex(null))
            }
        }
    }, [state.title])

    const dayDropItems = [
        { name: `Monday`, value: 1 },
        { name: `Tuesday`, value: 2 },
        { name: `Wednesday`, value: 3 },
        { name: `Thursday`, value: 4 },
        { name: `Friday`, value: 5 },
        { name: `Saturday`, value: 6 },
        { name: `Sunday`, value: 0 }
    ]

    return (
        <Modal closeHandler={() => appDispatch(hideBlockForm())}>
            <s.BlockFormContainer>
                <div>
                    <s.TitleContainer>
                        <s.TitleIconContainer onClick={() => formDispatch(fa.toggleSubjectDD())}>
                            <SubjectIcon />
                        </s.TitleIconContainer>
                        <s.TitleInput
                            value={state.title}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => formDispatch(fa.setTitle(e.target.value))}
                            autoFocus={!(oldBlock || duplicateBlock)}
                        />
                        {state.title.length === 0 && <s.TitlePlaceholder>Enter a title</s.TitlePlaceholder>}
                    </s.TitleContainer>
                    <s.SubjectContainer>
                        <AnimatePresence>
                            {state.isSubjectDDVisible && (
                                <ValueDropdown
                                    selected={state.selectedSubjectIndex}
                                    items={state.filteredSubjects}
                                    selectHandler={(idx: number) =>
                                        formDispatch(
                                            fa.substituteSubject({
                                                index: idx,
                                                subject: subjects[idx]
                                            })
                                        )
                                    }
                                    closeHandler={() => formDispatch(fa.hideSubjectDD())}
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
                            {DayID[state.day]}
                            <s.InputValueArrowContainer
                                $isVisible={state.isDayDDVisible}
                                onClick={() => formDispatch(fa.toggleDayDD())}
                            >
                                <ArrowDownIcon />
                            </s.InputValueArrowContainer>
                            <AnimatePresence>
                                {state.isDayDDVisible && (
                                    <ValueDropdown
                                        selected={state.day}
                                        items={dayDropItems}
                                        selectHandler={(value: number) => formDispatch(fa.setDay(value))}
                                        closeHandler={() => formDispatch(fa.hideDayDD())}
                                    />
                                )}
                            </AnimatePresence>
                        </s.InputValue>
                    </s.InputContainer>

                    {/* Start time input */}
                    <s.InputContainer>
                        <s.InputName>Start Time</s.InputName>
                        <s.InputValue>
                            <span style={{ letterSpacing: `0.5px` }}>
                                {state.startHours.toString().padStart(2, `0`)}:
                                {state.startMinutes.toString().padStart(2, `0`)} {state.startAmPm}
                            </span>
                            <s.InputValueArrowContainer
                                $isVisible={state.isStartTimeDDVisible}
                                onClick={() => formDispatch(fa.toggleStartDD())}
                            >
                                <ArrowDownIcon />
                            </s.InputValueArrowContainer>
                            <AnimatePresence>
                                {state.isStartTimeDDVisible && (
                                    <TimeSelector
                                        hours={state.startHours}
                                        setHours={(hours: number) => formDispatch(fa.setStartHours(hours))}
                                        minutes={state.startMinutes}
                                        setMinutes={(minutes: number) => formDispatch(fa.setStartMinutes(minutes))}
                                        timeAmPm={state.startAmPm}
                                        setAmPm={(amPm: `am` | `pm`) => formDispatch(fa.setStartAmPm(amPm))}
                                        closeHandler={() => formDispatch(fa.hideStartDD())}
                                    />
                                )}
                            </AnimatePresence>
                        </s.InputValue>
                    </s.InputContainer>

                    {/* End time input */}
                    <s.InputContainer>
                        <s.InputName>End Time</s.InputName>
                        <s.InputValue>
                            <span style={{ letterSpacing: `0.5px` }}>
                                {state.endHours.toString().padStart(2, `0`)}:
                                {state.endMinutes.toString().padStart(2, `0`)} {state.endAmPm}
                            </span>
                            <s.InputValueArrowContainer
                                $isVisible={state.isEndTimeDDVisible}
                                onClick={() => formDispatch(fa.toggleEndDD())}
                            >
                                <ArrowDownIcon />
                            </s.InputValueArrowContainer>
                            <AnimatePresence>
                                {state.isEndTimeDDVisible && (
                                    <TimeSelector
                                        hours={state.endHours}
                                        setHours={(hours: number) => formDispatch(fa.setEndHours(hours))}
                                        minutes={state.endMinutes}
                                        setMinutes={(minutes: number) => formDispatch(fa.setEndMinutes(minutes))}
                                        timeAmPm={state.endAmPm}
                                        setAmPm={(amPm: `am` | `pm`) => formDispatch(fa.setEndAmPm(amPm))}
                                        closeHandler={() => formDispatch(fa.hideEndDD())}
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
                                    display: `flex`,
                                    justifyContent: `center`,
                                    alignItems: `center`
                                }}
                            >
                                <s.ColorIndicator $color={state.color} />
                                <div style={{ height: `100%`, fontSize: `12px` }}>{state.color}</div>
                            </div>
                            <s.InputValueArrowContainer
                                $isVisible={state.isColorDDVisible}
                                onClick={() => formDispatch(fa.toggleColorDD())}
                            >
                                <ArrowDownIcon />
                            </s.InputValueArrowContainer>
                            <AnimatePresence>
                                {state.isColorDDVisible && (
                                    <ColorSelector
                                        selected={state.color}
                                        changeHandler={(selectedColor: string) =>
                                            formDispatch(fa.setColor(selectedColor))
                                        }
                                        closeHandler={() => formDispatch(fa.hideColorDD())}
                                    />
                                )}
                            </AnimatePresence>
                        </s.InputValue>
                    </s.InputContainer>
                </s.BodySectionContainer>

                {/* Block description input */}
                <s.DescriptionContainer>
                    <s.DescriptionInput
                        value={state.description}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                            formDispatch(fa.setDescription(e.target.value))
                        }
                    />
                    {state.description.length === 0 && (
                        <s.DescriptionPlaceholder>Enter a description</s.DescriptionPlaceholder>
                    )}
                </s.DescriptionContainer>

                <s.ActionsContainer>
                    <s.ButtonContainer>
                        <TextButton
                            text={oldBlock ? `Delete` : `Discard`}
                            onClick={() => dangerButtonHandler(oldBlock, appDispatch)}
                            danger
                        />
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
