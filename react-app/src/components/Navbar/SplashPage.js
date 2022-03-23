import LoginModal from '../modals/LoginModal';
import SignupModal from '../modals/SignupModal'
import { useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import DemoUser from '../auth/DemoUser';
import './Splash.css'
import { FaGithub, FaLinkedin  } from "react-icons/fa";

function Splash() {
    const sessionUser = useSelector((state) => state.session.user);
    return (
        <div style={{backgroundColor: "black"}} className='splash-container'>
            {sessionUser ? (<Redirect to='/events' />) :
                (<div className="splash-main">
                    <div className="splash-text">
                        <h1 className="splash-title">One Mile More</h1>
                    </div>
                    <div className="splash-buttons">
                        <LoginModal />
                        <SignupModal />
                        <DemoUser />
                        <div>
                            <a href='https://github.com/CWoods2909' target='_blank'><FaGithub/></a>
                        <a href='https://www.linkedin.com/in/charles-woods-319a83231?trk=people-guest_people_search-card' target='_blank'><FaLinkedin/></a>
                        </div>
                    </div>
                    
                </div>)
                
            }
        </div>
    )
}

export default Splash;