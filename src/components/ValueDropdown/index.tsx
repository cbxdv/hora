import { useRef, useEffect } from 'react'
import CheckIcon from '../../assets/icons/Check.svg'
import * as s from './styles'

const ValueDropdown: React.FC<ValueDropdownProps> = ({ selected, items, selectHandler, closeHandler }) => {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                event.stopPropagation()
                closeHandler()
            }
        }
        document.addEventListener('click', handleClickOutside, true)
        return () => {
            document.removeEventListener('click', handleClickOutside, true)
        }
    }, [])

    return (
        <s.ValueDropdownContainer ref={ref}>
            {items.map((item) => (
                <s.DropdownItem
                    key={item.value}
                    $selected={selected === item.value}
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

type ValueDropdownProps = {
    selected: number
    items: {
        name: string
        value: number
    }[]
    selectHandler: (value: number) => void
    closeHandler: () => void
}

export default ValueDropdown