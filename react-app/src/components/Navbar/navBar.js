import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import NewEventModal from '../modals/NewEvent'
import './NavBar.css'

const NavBar = () => {
  return (
    <nav className='navBar'>
      <div className='home_create-event'>
        <div>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </div>
        <div className='new-event-button'>
          <NewEventModal />
        </div>
      </div>
        <div className='log-out-button'>
          <LogoutButton />
        </div>
    </nav>
  );
}

export default NavBar;
