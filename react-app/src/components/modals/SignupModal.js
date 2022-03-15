import SignUpForm from '../auth/SignUpForm';
import { FormModal } from '../../context/Modal';
import { useState } from 'react';

const SignupModal = () => {
    const [ renderModal, setRenderModal ] = useState(false);


    return (
        <>
            <button className='signup-button' onClick={() => setRenderModal(true)}>Signup</button>
            {renderModal ? (
                <FormModal onClose={() => setRenderModal(false)}>
                    <SignUpForm />
                </FormModal>
                ) : null
            }
        </>
    )
};

export default SignupModal;