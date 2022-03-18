import EditEvents from "../forms/EditEvent";
import { FormModal } from '../../context/Modal';
import { useState } from 'react';

const EditModal = () => {
    const [renderModal, setRenderModal] = useState(false);

    return (
        <div>
            <button className='edit-button' onClick={() => setRenderModal(true)}>Edit Event</button>
            {renderModal ? (
                <FormModal onClose={() => setRenderModal(false)}>
                    <EditEvents onClose={() => setRenderModal(false)} />
                </FormModal>
            ) : null
            }
        </div>
    )
}

export default EditModal