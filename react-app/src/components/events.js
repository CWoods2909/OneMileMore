import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

function EventList() {
    const event = useSelector((state) => state.events)
    // console.log(event);
    const eventComp = Object.values(event)?.map((ele) =>{
        return (
            <div className='event-container' key={ele.id}>
                <NavLink to={`/events/${ele.id}`}>{ele.eventName}</NavLink>
            </div>
        )
    })
    return(
        <div className='event-list'>
            <div>{eventComp}</div>
        </div>
    )
}

export default EventList