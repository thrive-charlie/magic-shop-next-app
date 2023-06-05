import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { TextInput, Alert } from '@mantine/core'

import Button from '@/components/common/button'
import { BiLogInCircle } from 'react-icons/bi'
import { BsExclamationTriangle } from 'react-icons/bs'

export default function ModalLogin({ close, setView }) {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginHandle = async (e) => {
        e.preventDefault();

        setLoading(true);

        const res = await signIn('credentials', {
            redirect: false,
            email,
            password,
            callbackUrl: `${window.location.origin}/`
        });

        setLoading(false);

        console.log(res);

        if (res?.error) {
            setError(true);
            console.error(res);
        } else {
            close();
        }
};

  return (
    <>
        <header className='text-center mb-4'>
            <h2 className='text-3xl font-bold tracking-tighter mb-2'>Login</h2>
            <p>Sign in to your account</p>
        </header>
        <div className='mb-12 max-w-md mx-auto'>
            <form onSubmit={loginHandle}>
                {error && (
                    <Alert icon={<BsExclamationTriangle className="w-6 h-6" />}
                        color="red" 
                        variant="outline"
                        className='mb-4'>
                        We could not find an account with those details. Have you 
                        <button 
                            onClick={() => setView('forgot')}
                            className='text-blue-500 underline bg-transparent transition-all hover:opacity-75'>
                            Forgot your password?
                        </button>
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
                <TextInput
                    label='Password'
                    value={password}
                    onChange={(event) => setPassword(event.currentTarget.value)}
                    placeholder='Enter your password'
                    type='password'
                    className='mb-8' />
                <div className="flex flex-col justify-center items-center">
                    <Button type='submit' loading={loading} icon={BiLogInCircle}>Login</Button>
                    <p className='mt-4'>
                        Don&apos;t have an account?
                        <button
                            onClick={() => setView('register')}
                            type="button"
                            className='ml-1 bg-transparent text-blue-500 underline transition-all hover:opacity-75'>
                            Register now
                        </button>
                        .
                    </p>
                </div>
            </form>
        </div>
    </>
  )
}
