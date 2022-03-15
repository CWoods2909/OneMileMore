import LoginForm from '../auth/LoginForm';
import { FormModal } from '../../context/Modal';
import { useState } from 'react';

const LoginModal = () => {
    const [ renderModal, setRenderModal ] = useState(false);


    return (
        <>
            <button className='login-button' onClick={() => setRenderModal(true)}>Login</button>
            {renderModal ? (
                <FormModal onClose={() => setRenderModal(false)}>
                    <LoginForm />
                </FormModal>
                ) : null
            }
        </>
    )
};

export default LoginModal;