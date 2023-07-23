import { ChangeEvent } from 'react'

import TrashIcon from '@assets/icons/Trash.svg'

import { IBlockFormAdditional } from './reducer'
import * as s from './styles'

const AdditionalsComponent: React.FC<AdditionalsComponentPropTypes> = ({ data, updateHandler, deleteHandler }) => {
    return (
        <s.AdditionalsComponentContainer>
            <s.AdditionalsName
                value={data.name}
                placeholder='Name'
                onChange={(e: ChangeEvent<HTMLInputElement>) => updateHandler({ ...data, name: e.target.value })}
            />
            <s.AdditionalsValue
                value={data.value}
                placeholder='Value'
                onChange={(e: ChangeEvent<HTMLInputElement>) => updateHandler({ ...data, value: e.target.value })}
            />
            <s.AdditionalsTrashContainer onClick={() => deleteHandler(data.id)}>
                <TrashIcon />
            </s.AdditionalsTrashContainer>
        </s.AdditionalsComponentContainer>
    )
}

type AdditionalsComponentPropTypes = {
    data: IBlockFormAdditional
    updateHandler: (data: IBlockFormAdditional) => void
    deleteHandler: (id: string) => void
}

export default AdditionalsComponent
