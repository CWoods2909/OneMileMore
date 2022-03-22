import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateComment } from '../../store/comment';

const EditCommentForm = ({ comment, onClose }) => {
    const dispatch = useDispatch()
    const id = comment.id

    const [body, setBody] = useState(comment?.body)
    const [errors, setErrors] = useState([])

    let updated
    const handleSubmit = async (e) => {
        e.preventDefault()

        updated = await dispatch(updateComment(body, comment?.eventId, comment?.userId, id))
        if (updated) {
            if (updated?.errors) return setErrors(updated.errors)
            else onClose()
        } else onClose()
    }

    useEffect(() => {
        setErrors([])
    }, [body])

    return (
        <form onSubmit={handleSubmit} className='edit-comment-form'>
            <h2>Edit Comment</h2>
            <ul className='errors'>{Object.values(errors).map((error, ind) => (
                <li key={ind}>{error}</li>
            ))}</ul>
            <div>
                <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                />
            </div>
            <div className='submit-button'>
                <button type='submit' disabled={errors.length > 0}>Submit</button>
            </div>
        </form>

    )

}



export default EditCommentForm