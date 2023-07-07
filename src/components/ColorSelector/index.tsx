import { useRef, useEffect } from 'react'

import { varietyColors } from '@styles/styleConstants'

import * as s from './styles'

const ColorSelector: React.FC<ColorSelectorProps> = ({ selected, changeHandler, closeHandler }) => {
    const ref = useRef<HTMLDivElement>(null)

    const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
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
        return () => {
            document.removeEventListener(`click`, handleClickOutside, true)
            document.removeEventListener(`keydown`, keyBindHandler, true)
        }
    }, [])
    return (
        <s.ColorSelectorContainer ref={ref}>
            <div>
                {Object.keys(varietyColors).map(c => (
                    <s.ColorButtonContainer
                        $selected={selected === varietyColors[c]}
                        onClick={() => {
                            changeHandler(varietyColors[c])
                            setTimeout(() => {
                                closeHandler()
                            })
                        }}
                        key={c}
                    >
                        <s.ColorButton $color={varietyColors[c]} />
                    </s.ColorButtonContainer>
                ))}
            </div>
        </s.ColorSelectorContainer>
    )
}

type ColorSelectorProps = {
    selected: string
    changeHandler: (selectedColor: string) => void
    closeHandler: () => void
}

export default ColorSelector
