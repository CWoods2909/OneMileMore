import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './Events.css'

function EventList() {
    const event = useSelector((state) => state.events)
    
    
    const eventComp = Object.values(event)?.map((ele) =>{
        return (
            <div className='events-indv' key={ele.id}>
                <NavLink className={'Navlink'} to={`/events/${ele.id}`}>{ele.eventName}</NavLink>
                <div className='description'>{ele.description}</div>
            </div>
        )
    })
    return (
        <div className='events-container'>
            <h1>Upcoming Events</h1>
            <div>{eventComp}</div>
        </div>
    )
}

export default EventList