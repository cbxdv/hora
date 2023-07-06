import { useRef, useEffect } from 'react'
import * as s from './styles'
import { getPixelsToScrollInList } from '../../utilities/styleUtils'

const TimeSelector: React.FC<TimeInputProps> = ({
    hours,
    minutes,
    timeAmPm,
    setHours,
    setMinutes,
    setAmPm,
    closeHandler
}) => {
    const selectorRef = useRef<HTMLDivElement>(null)
    const hoursRef = useRef<HTMLDivElement>(null)
    const hoursSelectedRef = useRef<HTMLDivElement>(null)
    const minsRef = useRef<HTMLDivElement>(null)
    const minsSelectedRef = useRef<HTMLDivElement>(null)

    const handleClickOutside = (event: MouseEvent) => {
        if (selectorRef.current && !selectorRef.current.contains(event.target as Node)) {
            event.stopPropagation()
            closeHandler()
        }
    }

    const keyBindHandler = (event: KeyboardEvent) => {
        event.stopPropagation()
        if (event.key === 'Escape') {
            closeHandler()
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true)
        document.addEventListener('keydown', keyBindHandler, true)

        // Brings selected items into the view
        setTimeout(() => {
            if (hoursRef?.current && hoursSelectedRef?.current) {
                const position = getPixelsToScrollInList(hoursRef, hoursSelectedRef)
                hoursRef.current.scrollTo({ top: position, behavior: 'smooth' })
            }
            if (minsRef?.current && minsSelectedRef?.current) {
                const position = getPixelsToScrollInList(minsRef, minsSelectedRef)
                minsRef.current.scrollTo({ top: position, behavior: 'smooth' })
            }
        }, 100)

        return () => {
            document.removeEventListener('click', handleClickOutside, true)
            document.removeEventListener('keydown', keyBindHandler, true)
        }
    }, [])

    const generateHours = () => {
        const hoursOptions = []
        for (let i = 1; i <= 12; i++) {
            hoursOptions.push(
                <s.DropdownItem
                    onClick={() => setHours(i)}
                    $selected={i === hours}
                    ref={i === hours ? hoursSelectedRef : null}
                    key={i}
                    style={{ justifyContent: 'center' }}
                >
                    {i.toString().padStart(2, '0')}
                </s.DropdownItem>
            )
        }
        return hoursOptions
    }

    const generateMinutes = () => {
        const minuteOptions = []
        for (let i = 0; i < 60; i++) {
            minuteOptions.push(
                <s.DropdownItem
                    onClick={() => setMinutes(i)}
                    $selected={i === minutes}
                    ref={i === minutes ? minsSelectedRef : null}
                    key={i}
                    style={{ justifyContent: 'center' }}
                >
                    {i.toString().padStart(2, '0')}
                </s.DropdownItem>
            )
        }
        return minuteOptions
    }

    return (
        <s.TimeInputContainer ref={selectorRef}>
            <s.TimeInputComponent ref={hoursRef}>{generateHours()}</s.TimeInputComponent>
            <s.TimeInputComponent ref={minsRef}>{generateMinutes()}</s.TimeInputComponent>
            <s.TimeInputComponent>
                {['AM', 'PM'].map((m) => (
                    <s.DropdownItem
                        onClick={() => {
                            setAmPm(m.toLowerCase() as 'am' | 'pm')
                        }}
                        $selected={m.toLowerCase() === timeAmPm}
                        key={m}
                        style={{ justifyContent: 'center' }}
                    >
                        {m}
                    </s.DropdownItem>
                ))}
            </s.TimeInputComponent>
        </s.TimeInputContainer>
    )
}

type TimeInputProps = {
    hours: number
    setHours: (newHours: number) => void
    minutes: number
    setMinutes: (newMinutes: number) => void
    timeAmPm: 'am' | 'pm'
    setAmPm: (newAmPm: 'am' | 'pm') => void
    closeHandler: () => void
}

export default TimeSelector
