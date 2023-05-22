"use client"
import React, { useState } from 'react'
import axios from '@/utils/axios'
import { useSession } from 'next-auth/react';

export default function AddToCart({ id }) {

    const [loading, setLoading] = useState(false);
    const { data } = useSession();

    const handleAddToCart = async () => {
        setLoading(true);
        const response = await axios('/api/cart/add', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${data.user.access_token}`,
            },
            data: { id, quantity: 2 }
        });

        console.log(response);
        setLoading(false);

    }

  return (
    <button 
        type="button"
        className='p-2 rounded bg-slate-900 text-white'
        onClick={handleAddToCart}>
        Add to Cart - {loading ? 'Adding...' : 'Add'}
    </button>
  )
}
