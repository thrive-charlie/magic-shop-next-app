import React, { useState } from 'react'
import { TextInput, Alert } from '@mantine/core';
import { BsPersonCheck, BsSend, BsArrowLeft } from 'react-icons/bs';
import Button from '@/components/common/button';

export default function ModalForgotPassword({ setView }) {

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');

    const resetHandle = async (e) => {
        e.preventDefault();
        setMessage('If you have an account with us, you will receive an email with a link to reset your password.');
    };

    return (
        <>
            <header className='text-center mb-8'>
                <h2 className='text-3xl font-bold tracking-tighter mb-2'>Forgotten Password</h2>
                <p>Enter your email and you will be sent an email with instructions on resetting your password.</p>
            </header>
            <div className='mb-12 max-w-md mx-auto'>
                <form onSubmit={resetHandle}>
                    {message && (
                        <Alert
                            icon={<BsPersonCheck className="w-12 h-12" />}
                            color="green" variant="light" className='mb-4'>
                            {message}
                        </Alert>
                    )}
                    <TextInput
                        label='Email'
                        value={email}
                        onChange={(event) => setEmail(event.currentTarget.value)}
                        placeholder='Enter your email'
                        type="email"
                        required
                        className='mb-4' />
                    <div className="flex justify-center items-center gap-x-6 mt-8">
                        <Button onClick={() => setView('login')} icon={BsArrowLeft} style='outline'>Go Back</Button>
                        <Button type='submit' loading={loading} icon={BsSend}>Reset Password</Button>
                    </div>
                </form>
            </div>
        </>
    )
}
