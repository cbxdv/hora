import { useRef, useEffect } from 'react'
import * as s from './styles'

const TimeSelector: React.FC<TimeInputProps> = ({
    hours,
    minutes,
    ampm,
    setHours,
    setMinutes,
    setAmpm,
    closeHandler
}) => {
    const ref = useRef<HTMLDivElement>(null)

    const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
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
        return () => {
            document.removeEventListener('click', handleClickOutside, true)
            document.removeEventListener('keydown', keyBindHandler, true)
        }
    }, [])

    const generateHours = () => {
        const divs = []
        for (let i = 1; i <= 12; i++) {
            divs.push(
                <s.DropdownItem
                    onClick={() => setHours(i)}
                    $selected={i === hours}
                    key={i}
                    style={{ justifyContent: 'center' }}
                >
                    {i.toString().padStart(2, '0')}
                </s.DropdownItem>
            )
        }
        return divs
    }

    const generateMinutes = () => {
        const divs = []
        for (let i = 0; i < 60; i++) {
            divs.push(
                <s.DropdownItem
                    onClick={() => setMinutes(i)}
                    $selected={i === minutes}
                    key={i}
                    style={{ justifyContent: 'center' }}
                >
                    {i.toString().padStart(2, '0')}
                </s.DropdownItem>
            )
        }
        return divs
    }

    return (
        <s.TimeInputContainer ref={ref}>
            <s.TimeInputComponent>{generateHours()}</s.TimeInputComponent>
            <s.TimeInputComponent>{generateMinutes()}</s.TimeInputComponent>
            <s.TimeInputComponent>
                {['AM', 'PM'].map((m) => (
                    <s.DropdownItem
                        onClick={() => {
                            setAmpm(m.toLowerCase() as 'am' | 'pm')
                        }}
                        $selected={m.toLowerCase() === ampm}
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
    ampm: 'am' | 'pm'
    setAmpm: (newAmpm: 'am' | 'pm') => void
    closeHandler: () => void
}

export default TimeSelector
