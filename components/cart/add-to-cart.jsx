"use client"
import React, { useState } from 'react'
import Button from '@/components/common/button';
import { useSession } from 'next-auth/react';
import AuthModal from '../auth/auth-modal';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function AddToCart({ id }) {

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

        // Otherwise, continue to customiser
        router.push(`/products/customiser?id=${id}`);

    };

    const add = async() => {
        setLoading(true);

        await axios('/api/cart/add', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${data.user.access_token}`,
            },
            data: { id, quantity: 1 }
        });
        setLoading(false);

    }

  return (
    <>
        <Button 
            loading={loading}
            onClick={handleAddToCart}>
            Customise your product
        </Button>
        <Button loading={loading} onClick={add}>
            Add to cart
        </Button>
        <AuthModal open={authRequired} close={() => setAuthRequired(false)} />
    </>
  )
}
