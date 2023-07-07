import BlockAddIcon from '@assets/icons/BoxAdd.svg'

import { showBlockForm } from '@redux/slices/timetableSlice'
import { useAppDispatch } from '@redux/store'

import * as s from './styles'

const NewBlockButton = () => {
    const dispatch = useAppDispatch()
    return (
        <s.NewBlockButtonContainer onClick={() => dispatch(showBlockForm())}>
            <s.ButtonIconContainer>
                <BlockAddIcon />
            </s.ButtonIconContainer>
            <div>New Block</div>
        </s.NewBlockButtonContainer>
    )
}

export default NewBlockButton
