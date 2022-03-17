import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newEvent } from '../../store/event';
import { useHistory } from 'react-router-dom';

const NewEventForm = ({ onClose }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [eventName, setEventName] = useState('')
    const [location, setLocation] = useState('')
    const [length, setLength] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [description, setDescription] = useState('')
    const [errors, setErrors] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault();
        let new_Event = await dispatch(newEvent(eventName, location, length, date, time, description))
        if (new_Event?.errors) return setErrors
        if (new_Event) history.push(`/events/${new_Event.id}`)
    }

    return (
        <form onSubmit={handleSubmit} className='new-event-form'>
            <h2 className='new-event-header'>Create Event</h2>
            <ul className='errors'>{Object.entries(errors).map((error) => (
                <li key={error[0]}>{error[1]}: {error[0]}</li>
            ))}</ul>
            <div>
                <input
                    type='text'
                    placeholder='Whats the name of your event?'
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                />
            </div>
            <div>
                <input
                    type='text'
                    placeholder='Location of ride?'
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
            </div>
            <div>
                <input
                    type='number'
                    placeholder='What is the length of your ride?'
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                />
            </div>
            <div>
                <input
                    type='date'
                    placeholder='ex.. 1989-05-11'
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>
            <div>
                <input
                    type='text'
                    placeholder='What is the time of your ride?'
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                />
            </div>
            <div>
                <textarea
                    placeholder='Description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className='submit-button'>
            <button type='submit' disabled={errors.length > 0}>Submit</button>
            </div>
        </form>
    )
}

export default NewEventForm