"use client"

import React, { createContext, useState, useEffect } from 'react';
import { useForm, Controller } from "react-hook-form";
import { useSession } from 'next-auth/react';

export const CheckoutContext = createContext(null);

export function CheckoutProvider({ children }) {

    const { data: session } = useSession();
    const [shippingOption, setShippingOption] = useState();
    const [paymentOption, setPaymentOption] = useState();
    const [loading, setLoading] = useState(false);
    const { handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            shipping: {
                first_name: 'test',
                last_name: 'test',
                company: 'test',
                address_line_one: 'test',
                address_line_two: '',
                city: 'test',
                county: 'test',
                postcode: 'GL14 2JW',
                country: 'United Kingdom',
                phone_number: '01234567890',
            }
        },
        // defaultValues: async () => fetch('/api/checkout/prefill').then(res => res.json()),
    });

    const handleCheckout = async (checkoutData) => {
        setLoading(true);

        console.log(checkoutData);
        checkoutData = { shippingOption, paymentOption, ...checkoutData };

        try {
            const request = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/checkout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.user.access_token}`,
                },
                body: JSON.stringify(checkoutData)
            });

            const response = await request.json();

            if (response?.checkout_url) {
                window.location.href = response.checkout_url;
            }

        } catch (error) {
            console.log(error);
        }
    }

    const checkout = {
        shippingOption,
        setShippingOption,
        paymentOption,
        setPaymentOption,
        handleSubmit,
        control,
        errors,
        handleCheckout,
        loading
    };

    useEffect(() => {
        console.log(shippingOption, paymentOption);
    }, [shippingOption, paymentOption]);

    return (
        <CheckoutContext.Provider value={checkout}>
            <form onSubmit={handleSubmit(handleCheckout)} className="flex">
                {children}
            </form>
        </CheckoutContext.Provider>
    )
}