"use client";
import React, { useContext } from 'react'
import { CheckoutContext } from '@/components/providers/CheckoutProvider'
import { IoBagOutline } from 'react-icons/io5';
import Button from '@/components/common/button';

export default function CheckoutButton() {

    const { handleCheckout, loading } = useContext(CheckoutContext);

    return (
        <Button icon={IoBagOutline} loading={loading} type="submit">
            Place your order
        </Button>
    )
}
