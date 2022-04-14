import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css'
import { FaHome } from "react-icons/fa";
import Search from '../SearchBar'
import { FaGithub, FaLinkedin } from "react-icons/fa";


const NavBar = () => {

  // const sessionUser = useSelector(state => state.session.user)

  return (
    <nav className='navBar'>
      <div className='home_create-event'>
        <div className='home-button'>
          <NavLink to='/' exact={true} activeClassName='active'>
            <FaHome className='home' />
          </NavLink>
        </div>
        <div className='log-out-button'>
          <LogoutButton />
        </div>
      <div><Search /></div>
      </div>
      <div className='socials-navbar'>
        <a href='https://github.com/CWoods2909' target='_blank' rel='noreferrer'><FaGithub className='github2' /></a>
        <a href='https://www.linkedin.com/in/charles-woods-319a83231?trk=people-guest_people_search-card' target='_blank' rel='noreferrer'><FaLinkedin className='linked2' /></a>
      </div>
    </nav>
  );
}

export default NavBar;
