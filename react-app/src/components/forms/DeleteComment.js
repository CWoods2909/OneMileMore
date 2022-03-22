import { useDispatch, useSelector } from 'react-redux';
import { commentDelete, getAllComments } from '../../store/comment';
import { useParams } from 'react-router-dom';

const DestroyCommentForm = ({ onClose}) => {
    const dispatch = useDispatch()
    const {id} = useParams()
    const event = useSelector(state => state.events[id])
    const allComments = useSelector(state => Object.values(state.comments))
    const comments = allComments.filter(comment => comment.eventId === event.id)
    console.log(comments);
    const handleDelete = async (e) => {
        e.preventDefault()

        await dispatch(commentDelete(id))
            .then(onClose())
    }
    return (
        <div className='delete-container'>
            <p>Delete Event?</p>
            <button className="delete-button" onClick={handleDelete}>Yes</button>
        </div>
    )
}

export default DestroyCommentForm
