import { FormModal } from '../../context/Modal';
import { useState } from 'react';
import DestroyCommentForm from '../forms/DeleteComment'

const DeleteComment = ({id}) => {
    const [ renderModal, setRenderModal ] = useState(false);

    return (
        <>
            <button className='delete-button' onClick={() => setRenderModal(true)}>Delete Event</button>
            {renderModal ? (
                <FormModal onClose={() => setRenderModal(false)}>
                    <DestroyCommentForm id={id} onClose={() => setRenderModal(false)}/>
                </FormModal>
                ) : null
            }
        </>
    )
};

export default DeleteComment