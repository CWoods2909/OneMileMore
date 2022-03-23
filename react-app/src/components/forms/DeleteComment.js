import { useDispatch} from 'react-redux';
import { commentDelete} from '../../store/comment';


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
            <h2>Delete Comment?</h2>
            <button className="delete-button" onClick={handleDelete}>Yes</button>
        </div>
    )
}

export default DestroyCommentForm
