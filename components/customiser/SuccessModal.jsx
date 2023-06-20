import React from 'react'
import { Modal } from '@mantine/core'
import Button from '@/components/common/button';
import Link from 'next/link'
import { BsHandbag, BsCreditCard2Front } from 'react-icons/bs'

export default function SuccessModal({ open }) {

    return (
        <Modal
            opened={open}
            size="xl"
            closeButtonProps={{ style: { display: 'none' } }}
            closeOnClickOutside={false}
            closeOnEscape={false}
            overlayProps={{
                opacity: 0.55,
                blur: 6,
            }}
        >
            <header className='text-center mb-4 mt-4'>
                <h2 className='text-3xl font-bold tracking-tighter mb-2'>Success!</h2>
                <p>Your customised product has been added to your cart.</p>
            </header>
            <div className="flex items-center justify-center gap-x-4 mb-10">
                <Button as={Link} href="/products" icon={BsHandbag}>Add more products</Button>
                <Button as={Link} href="/cart" icon={BsCreditCard2Front}>Checkout</Button>
            </div>
        </Modal>
    )
}
