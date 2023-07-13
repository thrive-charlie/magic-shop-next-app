"use client"
import React, { useContext } from 'react'
import { CheckoutContext } from '@/components/providers/CheckoutProvider'
import { BsCheck } from 'react-icons/bs'

export default function ShippingOptions({ options }) {

    const { shippingOption, setShippingOption } = useContext(CheckoutContext);

    return (
        <>
            {options.length > 1 && (
                <div className="my-4 p-4 rounded bg-gray-100 flex flex-col gap-y-4">
                    <p>Shipping Options</p>
                    {options.map(({ id, label, price }) => (
                        <button
                            type='button'
                            onClick={() => setShippingOption(id)} key={id}
                            className={`p-2 bg-slate-700 text-white border-2 rounded flex items-center justify-center transition-all hover:bg-opacity-80 ${shippingOption === id ? 'shadow-xl' : ''}`}>
                            {label} +£{price}.00
                            {shippingOption === id && <BsCheck className='w-6 h-6' />}
                        </button>
                    ))}
                </div>
            )}
        </>
    )
}
