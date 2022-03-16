import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

function EventList() {
    const events = useSelector((state) => state.events)

    const eventComp = Object.values(events)?.map((ele) =>{
        return (
            <div className='event-container' key={ele.id}>
                <NavLink to={`/events/${ele.id}`}>{ele.eventName}</NavLink>
            </div>
        )
    })
    return(
        <div event-list>
            <div>{eventComp}</div>
        </div>
    )
}

export default EventList