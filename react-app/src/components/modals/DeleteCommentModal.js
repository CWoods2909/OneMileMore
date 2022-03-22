import { FormModal } from '../../context/Modal';
import { useState } from 'react';
import DestroyCommentForm from '../forms/DeleteComment'

const DeleteComment = ({comment}) => {
    const [ renderModal, setRenderModal ] = useState(false);
    return (
        <>
            <button className='delete-button' onClick={() => setRenderModal(true)}>Delete</button>
            {renderModal ? (
                <FormModal onClose={() => setRenderModal(false)}>
                    <DestroyCommentForm  comment={comment} onClose={() => setRenderModal(false)}/>
                </FormModal>
                ) : null
            }
        </>
    )
};

export default DeleteComment