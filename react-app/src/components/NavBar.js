import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import NewEventModal from './modals/NewEvent'

const NavBar = () => {
  return (
    <nav>
      <div>
        <div>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </div>
        <div>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </div>
        <div>
          <LogoutButton />
        </div>
        <div className='new-event-button'>
          <NewEventModal />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
