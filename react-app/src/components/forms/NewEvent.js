import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newEvent } from '../../store/event';
import { useHistory } from 'react-router-dom';

const NewEventForm = ({ onClose }) => {


    const defaultDate = () => {
        // yyyy-mm-dd
        const date = new Date().toISOString().slice(0, 10);
        return date;
    };



    const dispatch = useDispatch()
    const history = useHistory()
    const event = useSelector((state) => state.events)
    const [eventName, setEventName] = useState('')
    const [location, setLocation] = useState('')
    const [length, setLength] = useState('')
    const [date, setDate] = useState(`${defaultDate()}`)
    const [time, setTime] = useState('')
    const [description, setDescription] = useState('')
    const [errors, setErrors] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault();
        let new_Event = await dispatch(newEvent(eventName, location, length, date, time, description))
        if (new_Event?.errors) {
            return setErrors(new_Event.errors)
        }
        if (new_Event) history.push(`/events/${new_Event.id}`)
        onClose()
    }


    let dateString = new Date()
    let dateToday = dateString.toLocaleDateString().split('/')
    let datePicked
    
    useEffect(() => {
        const events = Object.values(event)
        const validate = []
        events.map(event => {
            if (eventName === event.eventName) validate.push('Sorry, that Event name is already in use.')
            return true
        })

        
        if (length < 0) validate.push('Please provide a valid ride length.')

        setErrors(validate)
    }, [eventName, length, event])

    useEffect(() => {
        const validate = []
        if (date.length) {
            datePicked = date.split('-')
            let year = datePicked.shift()
            datePicked.push(year)
            if (datePicked[2] <= dateToday[2] && datePicked[1] <= dateToday[1] && datePicked[0] <= dateToday[0]) validate.push('Please pick a valid date.')
        }

    }, [datePicked, date])


    return (
        <form onSubmit={handleSubmit} className='new-event-form'>
            <h2 className='new-event-header'>Create Event</h2>
            <ul className='errors'>{Object.values(errors).map((error, ind) => (
                <li key={ind}>{error}</li>
            ))}</ul>
            <div>
                <label>Name of event</label>
                <input
                    type='text'
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                />
            </div>
            <div>
                <label>Location of ride</label>
                <input
                    type='text'
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
            </div>
            <div>
                <label>Length of ride</label>
                <input
                    type='number'
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                />
            </div>
            <div>
                <label>Date</label>
                <input
                    type='date'
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>
            <div>
                <label>Time</label>
                <input
                    type='time'
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                />
            </div>
            <div>
                <label>Tell us about your ride</label>
                <textarea
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