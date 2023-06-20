"use client"
import React, { useState } from 'react'
import Button from '@/components/common/button';
import { useSession } from 'next-auth/react';
import AuthModal from '../auth/auth-modal';
import { useRouter } from 'next/navigation';

export default function AddToCart({ id, addons, quantity }) {

    const [loading, setLoading] = useState(false);
    const [authRequired, setAuthRequired] = useState(false);
    const { data: session } = useSession();
    const router = useRouter();

    const handleAddToCart = async () => {
        setLoading(true);

        // Make sure user is logged in
        if (!session) {
            setAuthRequired(true);
            setLoading(false);
            return;
        }

        // convert unix timestamp to string
        const time = new Date().getTime().toString();
        const key = `${time}-${id}`;
        await localStorage.setItem(key, JSON.stringify({ id, addons, quantity }));

        // Direct to customiser
        router.push(`/products/customiser?id=${key}`);

    };

    return (
        <>
            <Button
                loading={loading}
                onClick={handleAddToCart}>
                Customise your product
            </Button>
            <AuthModal open={authRequired} close={() => setAuthRequired(false)} completed={handleAddToCart} />
        </>
    )
}
