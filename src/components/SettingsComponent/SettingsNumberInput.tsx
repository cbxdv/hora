import { ChangeEvent } from 'react'

import * as s from './styles'

const SettingsNumberInput: React.FC<SettingsNumberInputProps> = ({ value, setValue, minimum, maximum }) => {
    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        // Setting the number to 0 if no characters found
        if (e.target.value.length === 0) {
            setValue(0)
            return
        }

        // Checking if the last element is a number and updating the state
        const lastEle = e.target.value.at(-1)
        if (isNaN(Number(lastEle))) {
            return
        }
        // Converting string to number
        const value = Number(e.target.value)
        // If the number lies in the
        if (value >= (minimum || Number.NEGATIVE_INFINITY) && value <= (maximum || Number.POSITIVE_INFINITY)) {
            setValue(value)
        }
    }

    return <s.SettingsNumberInputContainer value={value.toString()} onChange={changeHandler} />
}

export type SettingsNumberInputProps = {
    value: number
    setValue: (value: number) => void
    minimum?: number
    maximum?: number
}

export default SettingsNumberInput
