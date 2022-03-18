import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { allEvents } from '../store/event';
import DeleteEventModal from './modals/DeleteEventModal';
import EditEventForm from './forms/EditEvent';

const Single_Event = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const event = useSelector(state => state.events[id])
    const user = useSelector((state) => state.session.user)
    const [closeForm, openForm] = useState(false);
    
    useEffect(() => {
        if (!id) return
        (async () => {
            dispatch(allEvents(id))
        })()
    }, [dispatch, id])
    
    const editForm = (e) => {
        openForm(true);
    }
    
    // console.log(event.userId, user.id, event, '########################################');

    return (
        <div className='Outer-event-container'>
            <ul className='event-details'>
                <li>{event.eventName}</li>
                <li>{event.location}</li>
                <li>{event.length}</li>
                <li>{event.date}</li>
                <li>{event.time}</li>
                <li>{event.description}</li>
            </ul>
            <div>
                {event?.userId === user?.id &&
                    <div>
                        <DeleteEventModal />
                        <button type='button' onClick={editForm}>Edit</button></div>}
                {closeForm && (<EditEventForm openForm={openForm} />)}
            </div>
        </div>

    )
}

export default Single_Event