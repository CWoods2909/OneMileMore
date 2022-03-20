import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { newComment } from '../../store/comment';

const NewCommentForm = ({onClose}) => {
    const dispatch = useDispatch()
    const {id} = useParams()
    const event = useSelector(state => state.events[id]?.id)
    // console.log(event);

    const [body, setBody] = useState('')
    const [errors, setErrors] = useState([])

    let newData
    const handleSubmit = async (e) => {
        e.preventDefault()

        newData = await dispatch(newComment(body, event))
        if (newData) {
        if (newData?.errors) return setErrors(newData.errors)
        else onClose()
        }else onClose()
    }

    useEffect(() => {
        setErrors([])
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
                <button type='submit' disabled={errors.length > 0}>Submit</button>
            </div>
        </form>
    )
}

export default NewCommentForm