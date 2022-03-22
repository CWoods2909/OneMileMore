import { useDispatch, useSelector } from 'react-redux';
import { commentDelete, getAllComments } from '../../store/comment';
import { useParams } from 'react-router-dom';

const DestroyCommentForm = ({ comment, onClose}) => {
    const dispatch = useDispatch()
    let id = comment.id
    const handleDelete = async (e) => {
        e.preventDefault()

        await dispatch(commentDelete(id))
            .then(onClose())
    }
    return (
        <div className='delete-container'>
            <p>Delete Event</p>
            <button className="delete-button" onClick={handleDelete}>Yes</button>
        </div>
    )
}

export default DestroyCommentForm
