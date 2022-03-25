import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { allEvents } from '../../store/event';
import DeleteEventModal from '../modals/DeleteEventModal';
import EditEventForm from '../forms/EditEvent';
import './SingleEvent.css'
import { getAllComments } from '../../store/comment';
import NewCommentModal from '../modals/CommentModal'
import DeleteComment from '../modals/DeleteCommentModal'
import EditComment from '../modals/EditCommentModal';

const Single_Event = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const event = useSelector(state => state.events[id])
    const user = useSelector((state) => state.session.user)
    const [closeForm, openForm] = useState(false);
    const allComments = useSelector(state => Object.values(state.comments))
    const comments = allComments?.filter(comment => comment?.eventId === event?.id)
    const reverse = comments.reverse()

    useEffect(() => {
        if (!id) return
        (async () => {
            await dispatch(getAllComments())
            await dispatch(allEvents(id))
        })()
    }, [dispatch, id])

    const editForm = (e) => {
        openForm(true);
    }

    const newDate = event?.date.split(' ')
    newDate?.pop()
    newDate?.pop()

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
    } else if (hours === '00') {
        newTime = "12";
    } 
    newTime += (minutes < 10) ? ":" + minutes : ":" + minutes;
    newTime += (hours >= 12) ? " P.M" : " A.M";


    return (
        <>
        <div className='outer-outer'>
            <div className='Outer-event-container'>
                <ul className='event-details'>
                    <strong>Event Name:</strong> <li>{event?.eventName}</li>
                    <strong>Location:</strong> <li>{event?.location}</li>
                    <strong>Length:</strong> <li>{event?.length} miles</li>
                    <strong>Date:</strong> <li>{newDate.join(' ')}</li>
                    <strong>Time:</strong> <li>{newTime}</li>
                    <strong>Description:</strong> <li>{event?.description}</li>
                </ul>
            </div>
        </div>
            <div className='deleteEdit-buttons'>
                {event?.userId === user?.id &&
                    <div className='button-spacing'>
                        <DeleteEventModal />
                        <button type='button' onClick={editForm}>Edit Event</button></div>}
                <NewCommentModal />

            </div>
            <div className='event-form-container'>
                {closeForm && (<EditEventForm openForm={openForm} />)}
            </div>
            {reverse?.map((comment, idx) => (
                    
                <div className='outer-comment'>
                <ul className='comment-container' key={idx}>
                    <strong>
                        User: {comment?.username}
                    </strong>
                    <li>
                        {comment?.body}
                    </li>
                <div className='delete-edit-container'>
                <div>
                    {comment?.userId === user?.id &&
                    <DeleteComment comment={comment}/>
                }
                </div> 
                <div>
                {comment?.userId === user?.id &&
                <EditComment comment={comment}/>
            }
                </div>
            </div>
            </ul>
            </div>
                
            ))}
        </>
    )
}

export default Single_Event