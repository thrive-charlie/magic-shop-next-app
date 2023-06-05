"use client"

import React, { useEffect, useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import { Button, TextInput, Checkbox } from '@mantine/core';
import { IoBagOutline } from 'react-icons/io5';
import { useSession } from 'next-auth/react';

export default function CheckoutForm() {

    const [loading, setLoading] = useState(false);
    const { data: session } = useSession();
    const [differentBilling, setDifferentBilling] = useState(true);
    const { handleSubmit, control, formState: { errors } } = useForm({
        // All form fields must have a default value
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
        // TODO: Implement auto prefill from API
        // defaultValues: async () => fetch('/api/checkout/prefill').then(res => res.json()),
    });

    const handleCheckout = async (data) => {
        
        setLoading(true);

        try {
            const request = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/checkout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.user.access_token}`,
                },
                body: JSON.stringify(data)
            });
        
            const response = await request.json();
    
            if (response?.checkout_url) {
                window.location.href = response.checkout_url;
            }

        } catch (error) {
            console.log(error);
        }

    };

  return (
    <form onSubmit={handleSubmit(handleCheckout)}>

        <div className="grid grid-cols-2 gap-x-12 gap-y-4 mb-4">
            <Controller
                name="shipping.first_name"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                    <TextInput placeholder="First Name" label="First Name" withAsterisk error={errors?.shipping?.first_name && 'Please provide your first name'} {...field}/>
                )}
            />
            <Controller
                name="shipping.last_name"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                    <TextInput placeholder="Last Name" label="Last Name" withAsterisk error={errors?.shipping?.last_name && 'Please provide your last name'} {...field}/>
                )}
            />
            <Controller
                name="shipping.company"
                control={control}
                render={({ field }) => (
                    <TextInput placeholder="Company" label="Company" {...field}/>
                )}
            />
            <Controller
                name="shipping.address_line_one"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                    <TextInput placeholder="Address Line One" label="Address Line One" withAsterisk error={errors?.shipping?.address_line_one && 'Please provide the first line of your address'} {...field}/>
                )}
            />
            <Controller
                name="shipping.address_line_two"
                control={control}
                render={({ field }) => (
                    <TextInput placeholder="Address Line Two" label="Address Line Two" {...field}/>
                )}
            />
            <Controller
                name="shipping.city"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                    <TextInput placeholder="City" label="City" withAsterisk error={errors?.shipping?.city && 'Please provide your city'} {...field}/>
                )}
            />
            <Controller
                name="shipping.county"
                control={control}
                render={({ field }) => (
                    <TextInput placeholder="County" label="County" {...field}/>
                )}
            />
            <Controller
                name="shipping.postcode"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                    <TextInput placeholder="Postcode" label="Postcode" withAsterisk error={errors?.shipping?.postcode && 'Please provide your postcode'} {...field}/>
                )}
            />
            <Controller
                name="shipping.phone_number"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                    <TextInput placeholder="Phone Number" label="Phone Number" withAsterisk error={errors?.shipping?.phone_number && 'Please provide your Phone Number'} {...field}/>
                )}
            />
        </div>
      
        {differentBilling && (
            <div className='mb-4'>
                <p>User needs a different billing address</p>
            </div>
        )}

        <Button
            type="submit"
            leftIcon={<IoBagOutline className="w-4 h-4" />}
            loading={loading}
        >
            Checkout
        </Button>
    </form>
  )
}
