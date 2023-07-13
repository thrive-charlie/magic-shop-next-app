"use client"

import React, { useState, useContext, useEffect } from 'react';
import { Controller } from "react-hook-form";
import { TextInput, Checkbox } from '@mantine/core';
import useDebounce from '@/hooks/useDebounce';
import { CheckoutContext } from '@/components/providers/CheckoutProvider';

export default function CheckoutForm() {

    const [differentBilling, setDifferentBilling] = useState(true);
    const [postcode, setPostcode] = useState('');
    const { control, errors, updatePostcode } = useContext(CheckoutContext);

    const debouncedPostcode = useDebounce(postcode, 2000);

    useEffect(() => {
        if (debouncedPostcode) {
            updatePostcode(debouncedPostcode);
        }
    }, [debouncedPostcode, updatePostcode]);

    return (
        <div>

            <div className="grid grid-cols-2 gap-x-12 gap-y-4 mb-4">
                <Controller
                    name="shipping.first_name"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <TextInput placeholder="First Name" label="First Name" withAsterisk error={errors?.shipping?.first_name && 'Please provide your first name'} {...field} />
                    )}
                />
                <Controller
                    name="shipping.last_name"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <TextInput placeholder="Last Name" label="Last Name" withAsterisk error={errors?.shipping?.last_name && 'Please provide your last name'} {...field} />
                    )}
                />
                <Controller
                    name="shipping.company"
                    control={control}
                    render={({ field }) => (
                        <TextInput placeholder="Company" label="Company" {...field} />
                    )}
                />
                <Controller
                    name="shipping.address_line_one"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <TextInput placeholder="Address Line One" label="Address Line One" withAsterisk error={errors?.shipping?.address_line_one && 'Please provide the first line of your address'} {...field} />
                    )}
                />
                <Controller
                    name="shipping.address_line_two"
                    control={control}
                    render={({ field }) => (
                        <TextInput placeholder="Address Line Two" label="Address Line Two" {...field} />
                    )}
                />
                <Controller
                    name="shipping.city"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <TextInput placeholder="City" label="City" withAsterisk error={errors?.shipping?.city && 'Please provide your city'} {...field} />
                    )}
                />
                <Controller
                    name="shipping.county"
                    control={control}
                    render={({ field }) => (
                        <TextInput placeholder="County" label="County" {...field} />
                    )}
                />
                <Controller
                    name="shipping.postcode"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <TextInput placeholder="Postcode" label="Postcode" withAsterisk error={errors?.shipping?.postcode && 'Please provide your postcode'} onKeyUp={e => setPostcode(e.target.value)} {...field} />
                    )}
                />
                <Controller
                    name="shipping.phone_number"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <TextInput placeholder="Phone Number" label="Phone Number" withAsterisk error={errors?.shipping?.phone_number && 'Please provide your Phone Number'} {...field} />
                    )}
                />
            </div>

            {differentBilling && (
                <div className='mb-4'>
                    <p>User needs a different billing address</p>
                </div>
            )}

        </div>
    )
}
