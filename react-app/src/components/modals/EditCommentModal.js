import EditCommentForm from '../forms/EditCommentForm';
import { FormModal } from '../../context/Modal';
import { useState } from 'react';

const EditComment = ({comment}) => {
    const [renderModal, setRenderModal] = useState(false);

    return (
        <div>
            <button className='edit-comment-button' onClick={() => setRenderModal(true)}>Edit</button>
            {renderModal ? (
                <FormModal onClose={() => setRenderModal(false)}>
                    <EditCommentForm comment={comment} onClose={() => setRenderModal(false)} />
                </FormModal>
            ) : null
            }
        </div>
    )
}

export default EditComment