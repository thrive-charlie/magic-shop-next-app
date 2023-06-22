import React, { useState } from 'react'
import { Modal } from '@mantine/core'

import ModalLogin from './modal-login'
import ModalRegister from './modal-register';
import ModalForgotPassword from './modal-forgot-password';

export default function AuthModal({ open, close, completed }) {

    // TODO: Convert to reducer
    const [view, setView] = useState('login');
    const [message, setMessage] = useState('');

    let Component = 'login';
    switch (view) {
        case 'login':
            Component = ModalLogin;
            break;
        case 'register':
            Component = ModalRegister;
            break;
        case 'forgot':
            Component = ModalForgotPassword;
            break;
    }

    return (
        <Modal opened={open}
            size="xl"
            centered
            overlayProps={{
                blur: 5,
            }}
            onClose={close}>
            <Component close={close} setView={setView} completed={completed} message={message} setMessage={setMessage} />
        </Modal>
    )
}
