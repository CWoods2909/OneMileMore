import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import NewEventModal from '../modals/NewEvent'
import './NavBar.css'
// import { useSelector} from 'react-redux';
import { FaHome } from "react-icons/fa";
import Search from '../SearchBar'

const NavBar = () => {
  
  // const sessionUser = useSelector(state => state.session.user)

  return (
    <nav className='navBar'>
      <div className='home_create-event'>
        <div className='home-button'>
          <NavLink to='/' exact={true} activeClassName='active'>
            <FaHome className='home'/>
          </NavLink>
        </div>
        <div className='new-event-button'>
          <NewEventModal />
        </div>
      </div>
      <div><Search />
      </div>
        <div className='log-out-button'>
          <LogoutButton />
        </div>
    </nav>
  );
}

export default NavBar;
