"use client"
import React, { useContext } from 'react'
import { CheckoutContext } from '@/components/providers/CheckoutProvider'
import { BsCreditCard2Back, BsCheck } from 'react-icons/bs'
import { useDisclosure } from '@mantine/hooks';
import { Tooltip } from '@mantine/core';

export default function PaymentOptions({ options }) {

    const { paymentOption, setPaymentOption } = useContext(CheckoutContext);

    return (
        <>
            {options.length > 1 && (
                <div className="my-4 p-4 rounded bg-gray-100 flex flex-col gap-y-4">
                    <p>Payment Options</p>
                    {options.map(({ id, label, description }) => {
                        const hasDescription = description && description.length > 0;
                        return (
                            <Tooltip key={id} events={{ hover: hasDescription, focus: hasDescription }} label={description} transitionProps={{ duration: 200 }} width={300} withArrow multiline>
                                <button
                                    type='button'
                                    onClick={() => setPaymentOption(id)}
                                    className={`p-2 bg-slate-700 text-white border-4 rounded flex justify-start items-center transition-all hover:bg-opacity-80 ${paymentOption === id ? 'shadow-xl' : ''}`}>
                                    <BsCreditCard2Back className='w-6 h-6 mr-4' />
                                    <span className='flex-1'>{label}</span>
                                    {paymentOption === id && <BsCheck className='w-6 h-6' />}
                                </button>
                            </Tooltip>
                        )
                    })}
                </div>
            )}
        </>
    )
}
