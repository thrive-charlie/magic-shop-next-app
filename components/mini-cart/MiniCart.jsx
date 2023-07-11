import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useDisclosure } from '@mantine/hooks';
import { Drawer } from '@mantine/core';
import { HiOutlineShoppingBag } from "react-icons/hi";
import useApi from '@/utils/useApi';
import MiniCartItem from './MiniCartItem';
import Button from '@/components/common/button';

export default function MiniCart() {
    const session = useSession();
    const { apiRequest } = useApi();
    const [opened, { open, close }] = useDisclosure(false);
    const [cart, setCart] = useState(null);

    const getCartData = async () => {
        if (session?.data) {
            const { data } = await apiRequest({
                url: `/cart`,
                token: session.data.user.access_token,
            });
            setCart(data);
        }
    }

    useEffect(() => {
        if (!cart) {
            getCartData();
        }
    }, [cart, session]);

    return (
        <>
            <button onClick={open} className='mr-4 bg-transparent'>
                <HiOutlineShoppingBag className='w-6 h-6' />
            </button>
            <Drawer
                opened={opened}
                onClose={close}
                title="Cart"
                position="right"
                overlayProps={{ blur: 5 }}
                style={{ position: 'relative' }}
                transitionProps={{ transition: 'slide-left', duration: 300, timingFunction: 'ease-in-out' }}>
                {cart?.items ? (
                    <>
                        <h2 className='font-bold tracking-tight text-lg mb-4'>{cart.items.length} item(s) in the cart</h2>
                        {cart.items.map((item) => <MiniCartItem key={item.id} {...item} />)}
                        <div>
                            <Button as={Link} href="/checkout">Checkout</Button>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center mt-12">
                        <HiOutlineShoppingBag className='w-10 h-10 opacity-75' />
                        <h2 className='font-bold tracking-tight text-lg my-4 opacity-75'>You haven{`&apos;`}t added any items to your cart</h2>
                        <Button onClick={close} as={Link} href="/products" variant='outline' color='violet'>View our product range</Button>
                    </div>
                )}

            </Drawer>
        </>
    )
}
