import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { edit_comment } from '../../store/comment';

const EditCommentForm = ({openForm}) => {
    const dispatch = useDispatch()
    const {id} = useParams()
    const event = useSelector(state => state.events[id]?.id)

    const [body, setBody] = useState(event?.body)
    const [errors, setErrors] = useState([]) 

    const handleSubmit = async (e) => {
        e.preventDefault()
    }
}