import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import {GrLogout} from 'react-icons/gr'

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return <button className='log-out-button' onClick={onLogout}><GrLogout/></button>;
};

export default LogoutButton;
