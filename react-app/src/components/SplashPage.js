import LoginModal from './modals/LoginModal';
import SignupModal from './modals/SignupModal'
import { useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import DemoUser from './auth/DemoUser';
import './Splash.css'

function Splash() {
    const sessionUser = useSelector((state) => state.session.user);
    return (
        <div style={{backgroundColor: "black"}} className='splash-container'>
            {sessionUser ? (<Redirect to='/users' />) :
                (<div className="splash-main">
                    <div className="splash-text">
                        <h1 className="splash-title">Welcome to One Mile More</h1>
                    </div>
                    <div className="splash-buttons">
                        <LoginModal />
                        <SignupModal />
                        <DemoUser />
                    </div>
                </div>)
            }
        </div>
    )
}

export default Splash;