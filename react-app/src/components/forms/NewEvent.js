import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newEvent } from '../../store/event';
import { useHistory } from 'react-router-dom';

const NewEventForm = ({ onClose }) => {


    const defaultDate = () => {
        const date = new Date().toISOString().slice(0, 10);
        return date;
    };



    const dispatch = useDispatch()
    const history = useHistory()
    const event = useSelector((state) => state.events)
    const [eventName, setEventName] = useState('')
    const [location, setLocation] = useState('')
    const [length, setLength] = useState(1)
    const [date, setDate] = useState(`${defaultDate()}`)
    const [time, setTime] = useState('')
    const [description, setDescription] = useState('')
    const [errors, setErrors] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault();
        let new_Event = await dispatch(newEvent(eventName, location, length, date, time, description))
        if (new_Event?.errors) {
            return setErrors(new_Event?.errors)
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
        events?.map((event) => {
            if (eventName.trim().toLowerCase() === event.eventName.trim().toLowerCase()) validate.push('Sorry, that Event name is already in use.')
        })

        if (date?.length) {
            datePicked = date?.split('-')
            let year = datePicked?.shift()
            datePicked?.push(year)

            if (+datePicked[2] <= +dateToday[2] && +datePicked[1] <= +dateToday[1] && +datePicked[0] <= +dateToday[0]) validate.push('Please pick a valid date.')
        }
        if (eventName.trim().length < 5) validate.push('Event name must be more than 5 characters.')
        if (eventName.trim().length > 100) validate.push('Event name must not be longer than 100 characters.')
        if (location.trim().length < 5) validate.push('Location must have at least 5 characters.')
        if (location.trim().length > 100) validate.push('Location cannot be longer than 100 characters')
        if (length <= 0) validate.push('Please provide a valid ride length.')
        if (length % 1 !== 0) validate.push('No decimal points in length field please.')
        if (description.trim().length < 10) validate.push('Description must be greater than 10 characters.')
        if (description.trim().length > 500) validate.push('Description must not be longer than 500 characters.')
        setErrors(validate)
    }, [eventName, datePicked, date, length, location, description])


    return (
        <form onSubmit={handleSubmit} className='new-event-form'>
            <h2 className='new-event-header'>Create Event</h2>
            <ul className='errors'>{Object.values(errors).map((error, ind) => (
                <li key={ind}>{error}</li>
            ))}</ul>
            <div className='event-title-create'>
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
                    placeholder='Address or Location'
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
                    required={true}
                />
            </div>
            <div className='event-description-create'>
                <label>Tell us about your ride</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className='submit-button'>
                <button className='submit-button-event' type='submit' disabled={errors.length > 0}>Submit</button>
            </div>
        </form>
    )
}

export default NewEventForm