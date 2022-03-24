import EditCommentForm from '../forms/EditCommentForm';
import { FormModal } from '../../context/Modal';
import { useState } from 'react';
import { FaPencilAlt } from "react-icons/fa";


const EditComment = ({comment}) => {
    const [renderModal, setRenderModal] = useState(false);

    return (
        <div>
            <button className='edit-comment-button' onClick={() => setRenderModal(true)}><FaPencilAlt className='pencil'/></button>
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