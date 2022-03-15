import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/session';

const DemoUser = () => {
    const dispatch = useDispatch()
    const onClick = async (e) => {
        await dispatch(login('demo@aa.io', 'password'));
    };

    return <button className='demouser-btn' onClick={onClick}>Demo User</button>;
};

export default DemoUser;