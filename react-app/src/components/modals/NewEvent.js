import NewEventForm from '../forms/NewEvent'
import { FormModal } from '../../context/Modal'
import { useState } from 'react'

const NewEventModal = () => {
    const [renderModal, setRenderModal] = useState(false);

    return(
<>
            <button className='new-event-button' onClick={() => setRenderModal(true)}>Create Event</button>
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