import BlockAddIcon from '../../assets/icons/BoxAdd.svg'
import { useAppDispatch } from '../../redux/store'
import { showBlockForm } from '../../redux/slices/timetableSlice'
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
