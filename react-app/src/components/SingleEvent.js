import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
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

    const newDate = new Date(event?.date).toLocaleDateString('en-US')

    
        if(!event) {
            return <Redirect to='/events'/>
        }

        const theTime = event?.time.split(':')
        let hours = theTime[0]
        let minutes = theTime[1]
        
        let newTime;
        
        if (hours > 0 && hours <= 12) {
            newTime = "" + hours;
        } else if (hours > 12) {
            newTime = "" + (hours - 12);
        } else if (hours === 0) {
            newTime = "12";
        }
        newTime += (minutes < 10) ? ":0" + minutes : ":" + minutes;
        newTime += (hours >= 12) ? " P.M" : " A.M";
    
    
    return (
        <div className='Outer-event-container'>
            <ul className='event-details'>
                <li>{event?.eventName}</li>
                <li>{event?.location}</li>
                <li>{event?.length}</li>
                <li>{newDate}</li>
                <li>{newTime}</li>
                <li>{event?.description}</li>
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