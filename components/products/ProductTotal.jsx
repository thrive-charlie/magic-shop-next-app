"use client"

import React, { useEffect, useState } from 'react'
import { LoadingOverlay } from '@mantine/core';
import axios from 'axios';

export default function ProductTotal({ id, addons, quantity }) {

    const [loading, setLoading] = useState(true);
    const [price, setPrice] = useState(false);
    const [pricePerUnit, setPricePerUnit] = useState(false);

    const refreshPrice = async () => {
        setLoading(true);
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/price-calculate`, { id, addons, quantity }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        setPrice(data.price);
        setPricePerUnit(data.pricePerUnit);
        setLoading(false);
    };

    // Update the price when the addons or quantity changess
    useEffect(() => {
        refreshPrice();
    }, [addons, quantity]);

    return (
        <div className='relative'>
            <LoadingOverlay visible={loading} overlayBlur={2} loaderProps={{ size: 'sm', color: 'black' }} />
            <h3 className="text-2xl font-bold tracking-tighter">£{price}</h3>
            <p className='text-xs italic tracking-tighter'>£{pricePerUnit} per unit</p>
        </div>
    )
}
