import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import NewEventModal from '../modals/NewEvent';
import './Events.css'

function EventList() {
    const event = useSelector((state) => state.events)


    const eventComp = Object.values(event)?.map((ele, idx) => {
        return (
            <>
                <NavLink className={'Navlink'} to={`/events/${ele?.id}`}>
                    <div className='events-indv' key={ele?.id}>
                        <div className='event-title'>
                            <h2 >{ele?.eventName}</h2>
                        </div>
                        <div className='description'>{ele?.description}</div>
                    </div>
                </NavLink>
            </>
        )
    })
    return (
        <div className='events-container'>
            <h1>Upcoming Events</h1>
            <div className='create-event-header'>
            <div className='new-event-button'>
                <NewEventModal />
            </div>
            </div>
            <div>{eventComp}</div>
        </div>
    )
}

export default EventList