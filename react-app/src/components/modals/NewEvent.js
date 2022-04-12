import NewEventForm from '../forms/NewEvent'
import { FormModal } from '../../context/Modal'
import { useState } from 'react'
import {AiOutlinePlusSquare} from 'react-icons/ai';
const NewEventModal = () => {
    const [renderModal, setRenderModal] = useState(false);

    return(
<>
            <button className='new-event-button' onClick={() => setRenderModal(true)}><AiOutlinePlusSquare /></button>
            {renderModal ? (
                <FormModal onClose={() => setRenderModal(false)}>
                    <NewEventForm onClose={() => setRenderModal(false)}/>
                </FormModal>
                ) : null
            }
        </>
    )
}

export default NewEventModal;