import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { newComment } from '../../store/comment';
import { getAllComments } from '../../store/comment';

const NewCommentForm = ({onClose}) => {
    const dispatch = useDispatch()
    const {id} = useParams()
    const event = useSelector(state => state.events[id]?.id)
    const [body, setBody] = useState('')
    const [errors, setErrors] = useState([])

    let newData
    const handleSubmit = async (e) => {
        e.preventDefault()

        newData = await dispatch(newComment(body, event,))
        if (newData) {
            await dispatch(getAllComments())
        if (newData?.errors) return setErrors(newData.errors)
        else onClose()
        }else onClose()
    }

    useEffect(() => {
        let validate = []

        if(body.trim().length < 5) validate.push('Please provide a comment longer than 5 characters.')
        if(body.trim().length > 1000) validate.push('Comments can not be longer than 1000 characters.')
        setErrors(validate)
    }, [body])

    return (
        <form onSubmit={handleSubmit} className='new-comment-form'>
            <h2>Comment</h2>
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
                <button className='totally-comment-button' type='submit' disabled={errors.length > 0}>Submit</button>
            </div>
        </form>
    )
}

export default NewCommentForm