"use client"

import React, { createContext, useState, useCallback } from 'react';
import { useForm, Controller } from "react-hook-form";
import { useSession } from 'next-auth/react';
import useApi from '@/utils/useApi';

export const CheckoutContext = createContext(null);

export function CheckoutProvider({ data, children }) {

    const { data: session } = useSession();
    const { apiRequest } = useApi();
    const [shippingOption, setShippingOption] = useState(data.shipping_options[0].id);
    const [paymentOption, setPaymentOption] = useState(data.payment_options[0].id);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [shippingOptions, setShippingOptions] = useState(data.shipping_options);

    /**
     * react-hook-form setup for the checkout form
     */
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

    /**
     * Update the shipping options when the postcode changes.
     */
    const updatePostcode = useCallback(async (postcode) => {
        const { data } = await apiRequest({
            url: '/checkout/shipping-options',
            method: 'POST',
            body: {
                postcode: postcode
            }
        });
        setShippingOptions(data.shipping_options)
    }, []);

    /**
     * Handle the checkout process.
     * @param {*} checkoutData 
     */
    const handleCheckout = async (checkoutData) => {

        /** 
         * NOTE: Form has already been checked by react-hook-form 
         * before reaching here, no need to check validity again.  
         */

        // Show the loading indicator
        setLoading(true);

        // Have the shipping and payment options been selected?
        if (!shippingOption || !paymentOption) {
            setErrorMessage('Please make sure you have selected a payment and shipping option.');
            setLoading(false);
            return;
        }

        try {

            return;

            const { data, error } = await apiRequest({
                url: '/checkout',
                method: 'POST',
                token: session.user.access_token,
                body: { shippingOption, paymentOption, ...checkoutData }
            });

            // If there's any errors from the request, throw them.
            if (error) {
                throw new Error(error);
            }

            // Redirect to the Stripe checkout
            if (data?.checkout_url) {
                window.location.href = data.checkout_url;
            }

        } catch (error) {
            console.log(error);
        }
    };

    const checkout = {
        shippingOption,
        setShippingOption,
        paymentOption,
        setPaymentOption,
        handleSubmit,
        control,
        errors,
        handleCheckout,
        loading,
        updatePostcode,
        shippingOptions,
        errorMessage,
    };

    return (
        <CheckoutContext.Provider value={checkout}>
            <form onSubmit={handleSubmit(handleCheckout)} className="flex">
                {children}
            </form>
        </CheckoutContext.Provider>
    )
}