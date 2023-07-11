import { useRef, useEffect } from 'react'

import { varietyColors } from '@styles/styleConstants'

import * as s from './styles'

const ColorSelector: React.FC<ColorSelectorProps> = ({ selected, changeHandler, closeHandler }) => {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
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

        document.addEventListener(`click`, handleClickOutside, true)
        document.addEventListener(`keydown`, keyBindHandler, true)
        return () => {
            document.removeEventListener(`click`, handleClickOutside, true)
            document.removeEventListener(`keydown`, keyBindHandler, true)
        }
    }, [])

    return (
        <s.ColorSelectorContainer ref={ref}>
            <s.ColorsContainer>
                {Object.keys(varietyColors).map(vColor => (
                    <s.ColorButtonContainer
                        $selected={selected === varietyColors[vColor]}
                        onClick={() => {
                            changeHandler(varietyColors[vColor])
                            closeHandler()
                        }}
                        key={`${vColor}-button`}
                    >
                        <s.ColorButton $color={varietyColors[vColor]} />
                    </s.ColorButtonContainer>
                ))}
            </s.ColorsContainer>
        </s.ColorSelectorContainer>
    )
}

type ColorSelectorProps = {
    selected: string
    changeHandler: (selectedColor: string) => void
    closeHandler: () => void
}

export default ColorSelector
