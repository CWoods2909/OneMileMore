import { FormModal } from '../../context/Modal';
import { useState } from 'react';
import NewCommentForm from '../forms/CommentForm';

const NewCommentModal = () => {
    const [renderModal, setRenderModal] = useState(false);

    return(
        <>
        <button className='add-comment-button' onClick={() => setRenderModal(true)}>Comment</button>
            {renderModal ? (
                <FormModal onClose={() => setRenderModal(false)}>
                    <NewCommentForm onClose={() => setRenderModal(false)} />
                </FormModal>
                ) : null
            }
        </>
    )
}

export default NewCommentModal