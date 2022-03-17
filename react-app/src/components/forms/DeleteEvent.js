import { deleteEvent } from "../../store/event";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

const DelEventForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const event = useSelector((state) => state.events[id])

    const handleDelete = async (e) => {
        e.preventDefault()

        dispatch(deleteEvent(event))
            .then(() => {
                history.push(`/events`)
            })
    }
    return(
        <div className="delete-container">
            <p>Delete Event?</p>
            <button className="delete-button" onClick={handleDelete}>Yes</button>
        </div>
    )
}

export default DelEventForm