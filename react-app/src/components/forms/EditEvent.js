import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { edtEvent } from '../../store/event'
import { useParams } from 'react-router-dom';


const EditEventForm = ({ openForm }) => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const event = useSelector((state) => state.events[id])

    const formatDate = (date) => {
        const formattedDate = new Date(date).toISOString().slice(0, 10);
        return formattedDate;
    };


    const [eventName, setEventName] = useState(event?.eventName)
    const [location, setLocation] = useState(event?.location)
    const [length, setLength] = useState(event?.length)
    const [date, setDate] = useState(formatDate(event?.date))
    const [time, setTime] = useState(event?.time)
    const [description, setDescription] = useState(event?.description)
    const [errors, setErrors] = useState([])
    
    const handleSubmit = async (e) => {
        e.preventDefault()

        let editEvent = await dispatch(edtEvent(id, eventName, location, length, date, time, description,))
        if (editEvent?.errors) return setErrors(editEvent.errors)
        if (editEvent) {
            openForm(false)
        }
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
        
        if (date.length) {
            datePicked = date.split('-')
            let year = datePicked.shift()
            datePicked.push(year)
            if (datePicked[2] <= dateToday[2] && datePicked[1] < dateToday[1] && datePicked[0] <= dateToday[0]) validate.push('Please pick a valid date.')
        }

        if (length <= 0) validate.push('Please provide a valid ride length.')
        console.log(errors);
        setErrors(validate)
    }, [eventName, datePicked, date, length])

    const cancelSubmit = (e) => {
        e.preventDefault()
        openForm(false)
    }

    return (
        <form onSubmit={handleSubmit} className='edit-event-form'>
            <h2 className='edit-event-header'>Edit Event</h2>
            <ul className='errors'>{Object.values(errors).map((error) => (
                
                <li key={error}>{error}</li>
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
                <button type='button' onClick={cancelSubmit}>Cancel</button>
            </div>
        </form>
    )
}

export default EditEventForm