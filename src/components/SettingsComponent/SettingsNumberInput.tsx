import { ChangeEvent } from 'react'

import * as s from './styles'

const SettingsNumberInput: React.FC<SettingsNumberInputProps> = ({ value, setValue }) => {
    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        // Setting the number to 0 if no characters found
        if (e.target.value.length === 0) {
            setValue(0)
        }

        // Checking if the last element is a number and updating the state
        const lastEle = e.target.value.at(-1)
        if (isNaN(Number(lastEle))) {
            return
        }
        setValue(Number(e.target.value))
    }

    return <s.SettingsNumberInputContainer value={value.toString()} onChange={changeHandler} />
}

export type SettingsNumberInputProps = {
    value: number
    setValue: (value: number) => void
}

export default SettingsNumberInput
