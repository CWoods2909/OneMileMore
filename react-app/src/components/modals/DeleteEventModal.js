import { FormModal } from '../../context/Modal';
import { useState } from 'react';
import DelEventForm from '../forms/DeleteEvent';


const DeleteEventModal = ({id}) => {
    const [ renderModal, setRenderModal ] = useState(false);


    return (
        <>
            <button className='delete-button' onClick={() => setRenderModal(true)}>Delete Event</button>
            {renderModal ? (
                <FormModal onClose={() => setRenderModal(false)}>
                    <DelEventForm id={id} onClose={() => setRenderModal(false)}/>
                </FormModal>
                ) : null
            }
        </>
    )
};

export default DeleteEventModal