import { deleteEvent } from "../../store/event";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const DelEventForm = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const event = useSelector((state) => state.events[id])

    const handleDelete = async (e) => {
        e.preventDefault()

        await dispatch(deleteEvent(event))
            
            
    }
    return(
        <div className="delete-container">
            <h2>Delete Event?</h2>
            <button className="delete-button" onClick={handleDelete}>Yes</button>
        </div>
    )
}

export default DelEventForm