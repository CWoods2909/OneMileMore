import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { allEvents } from '../store/event';

const Single_Event = () =>{
    const {id} = useParams()
    const dispatch = useDispatch()
    const event = useSelector(state => state.events[id])
    console.log(event);

    useEffect(() =>{
        if(!id) return
        (async () => {
            dispatch(allEvents(id))
        })()
    }, [dispatch, id])


    return event?(
        <div className='Outer-event-container'>
            <ul className='event-details'>
                <li>{event.eventName}</li>
                <li>{event.location}</li>
                <li>{event.length}</li>
                <li>{event.date}</li>
                <li>{event.time}</li>
                <li>{event.description}</li>
            </ul>
        </div>
    ) : null
}

export default Single_Event