import React from 'react'
import Link from 'next/link'
import Button from '@/components/common/button'
import { RxHome } from 'react-icons/rx';

export default function NotFound() {
    return (
        <main className='flex items-center flex-col py-32'>
            <h1 className='text-4xl tracking-tighter font-bold mb-4'>404 - Page Not Found</h1>
            <p className='text-xl font-light tracking-tighter mb-4'>Could not find requested resource</p>
            <Button as={Link} icon={RxHome} href='/'>You are lost, go home</Button>
        </main>
    )
}
