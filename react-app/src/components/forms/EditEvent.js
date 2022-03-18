import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { edtEvent } from '../../store/event'
import { useParams } from 'react-router-dom';


const EditEventForm = ({openForm}) => {
    const dispatch = useDispatch()
    const {id} = useParams()
    const event = useSelector((state) => state.events[id])
    

    const [eventName, setEventName] = useState(event?.eventName)
    const [location, setLocation] = useState(event?.location)
    const [length, setLength] = useState(event?.length)
    const [date, setDate] = useState(event?.date)
    const [time, setTime] = useState(event?.time)
    const [description, setDescription] = useState(event?.description)
    const [errors, setErrors] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        let editEvent = await dispatch(edtEvent(id, eventName, location, length, date, time, description,))
        if (editEvent?.errors) return setErrors(editEvent.errors)
        if (editEvent) {
            // history.push(`/events/${editEvent.id}`);
            openForm(false)
        }
    }

    const cancelSubmit = (e) => {
        e.preventDefault()
        openForm(false)
    }

    return (
        <form onSubmit={handleSubmit} className='new-event-form'>
            <h2 className='new-event-header'>Edit Event</h2>
            <ul className='errors'>{Object.entries(errors).map((error) => (
                <li key={error[0]}>{error[1]}: {error[0]}</li>
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