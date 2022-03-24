import { FormModal } from '../../context/Modal';
import { useState } from 'react';
import DestroyCommentForm from '../forms/DeleteComment'
import { FaTrashAlt } from "react-icons/fa";

const DeleteComment = ({comment}) => {
    const [ renderModal, setRenderModal ] = useState(false);
    return (
        <>
            <button className='delete-button-comment' onClick={() => setRenderModal(true)}><FaTrashAlt className='trash'/></button>
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