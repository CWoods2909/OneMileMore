import { useDispatch, useSelector } from 'react-redux';
import { commentDelete } from '../../store/comment';
import { useParams } from 'react-router-dom';

const DestroyCommentForm = ({id, onClose}) => {
    const dispatch = useDispatch()
    
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
