import { useRef, useEffect } from 'react'

import CheckIcon from '@assets/icons/Check.svg'

import * as s from './styles'

const ValueDropdown: React.FC<ValueDropdownProps> = ({ selected, items, selectHandler, closeHandler }) => {
    const dropdownRef = useRef<HTMLDivElement>(null)
    const selectedItemRef = useRef<HTMLDivElement>(null)

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            event.stopPropagation()
            closeHandler()
        }
    }

    const keyBindHandler = (event: KeyboardEvent) => {
        event.stopPropagation()
        if (event.key === `Escape`) {
            closeHandler()
        }
    }

    useEffect(() => {
        document.addEventListener(`click`, handleClickOutside, true)
        document.addEventListener(`keydown`, keyBindHandler, true)

        // Brings selected item into the view
        setTimeout(() => {
            if (selectedItemRef && selectedItemRef.current) {
                selectedItemRef.current.scrollIntoView({ behavior: `smooth`, block: `center` })
            }
        }, 100)

        return () => {
            document.removeEventListener(`click`, handleClickOutside, true)
            document.removeEventListener(`keydown`, keyBindHandler, true)
        }
    }, [])

    return (
        <s.ValueDropdownContainer ref={dropdownRef}>
            {items.map((item) => (
                <s.DropdownItem
                    key={item.value}
                    $selected={selected === item.value}
                    ref={selected === item.value ? selectedItemRef : null}
                    onClick={() => {
                        selectHandler(item.value)
                        setTimeout(() => {
                            closeHandler()
                        })
                    }}
                >
                    {item.name}
                    {selected === item.value ? <CheckIcon /> : <></>}
                </s.DropdownItem>
            ))}
        </s.ValueDropdownContainer>
    )
}

export type ValueDropdownItemType = { name: string; value: number }

type ValueDropdownProps = {
    selected: number | null
    items: ValueDropdownItemType[]
    selectHandler: (value: number) => void
    closeHandler: () => void
}

export default ValueDropdown
