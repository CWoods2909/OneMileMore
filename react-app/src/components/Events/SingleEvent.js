import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { allEvents } from '../../store/event';
import DeleteEventModal from '../modals/DeleteEventModal';
import EditEventForm from '../forms/EditEvent';
import Comment from '../comments/comment'
import './SingleEvent.css'
import { getAllComments } from '../../store/comment';

const Single_Event = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const event = useSelector(state => state.events[id])
    const user = useSelector((state) => state.session.user)
    const [closeForm, openForm] = useState(false);
    const allComments = useSelector(state => state.comments)
    // console.log(allComments[id]);
    useEffect(() => {
        if (!id) return
        (async () => {
            dispatch(allEvents(id))
            dispatch(getAllComments(id))
        })()
    }, [dispatch, id])

    const editForm = (e) => {
        openForm(true);
    }

    const newDate = event?.date.split(' ')
    newDate.pop()
    newDate.pop()
    
    if (!event) {
        return <Redirect to='/events' />
    }

    const theTime = event?.time.split(':')
    let hours = theTime[0]
    let minutes = theTime[1]

    let newTime;

    if (hours > 0 && hours <= 12) {
        newTime = "" + hours;
    } else if (hours > 12) {
        newTime = "" + (hours - 12);
    } else if (hours === 0) {
        newTime = "12";
    }
    newTime += (minutes < 10) ? ":" + minutes : ":" + minutes;
    newTime += (hours >= 12) ? " P.M" : " A.M";


    return (
        <>
            <div className='Outer-event-container'>
                <ul className='event-details'>
                    <li>Event Name: {event?.eventName}</li>
                    <li>Location: {event?.location}</li>
                    <li>Length: {event?.length} miles</li>
                    <li>Date: {newDate}</li>
                    <li>Time: {newTime}</li>
                    <li>Description: {event?.description}</li>
                </ul>
                {allComments && allComments[id]?.map(ele => (
                    <Comment key={ele.id} comment={ele} />
                ))}
            </div>
            <div className='deleteEdit-buttons'>
                {event?.userId === user?.id &&
                    <div className='button-spacing'>
                        <DeleteEventModal />
                        <button type='button' onClick={editForm}>Edit</button></div>}
                {closeForm && (<EditEventForm openForm={openForm} />)}
            </div>

        </>
    )
}

export default Single_Event