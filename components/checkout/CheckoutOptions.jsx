"use client"
import React, { useContext, useState } from 'react'
import { Alert } from '@mantine/core';
import { GoAlert } from 'react-icons/go';
import { CheckoutContext } from "@/components/providers/CheckoutProvider";
import CheckoutButton from "./CheckoutButton";
import PaymentOptions from "./PaymentOptions";
import ShippingOptions from "./ShippingOptions";
import InvoiceInfo from "./InvoiceInfo";

export default function CheckoutOptions({ checkout }) {

    const { paymentOption, shippingOptions, errorMessage } = useContext(CheckoutContext);

    // When the postcode updates, new shipping options are fetched. 
    // We need to find a way to access those shipping options. 

    return (
        <div className="bg-white p-8 shadow-sky-500/20 shadow-xl">
            <ul className="mb-4 bg-gray-100 p-4 rounded">
                {checkout?.cart?.map((item) => (
                    <li key={item.id} className="flex items-center justify-between">
                        <p>{item.quantity} x {item.product_name}</p>
                        <p>£{item.product_price}</p>
                    </li>
                ))}
            </ul>

            <ul className="my-4 p-4 bg-gray-100 rounded">
                <li className="flex justify-between items-center">
                    <p>Subtotal</p>
                    <p>£{checkout?.totals.subtotal}</p>
                </li>
                {checkout?.totals.shipping && (
                    <li className="flex justify-between items-center">
                        <p>Shipping</p>
                        <p>£0.00</p>
                    </li>
                )}
                <li className="flex justify-between items-center">
                    <p>VAT</p>
                    <p>£{checkout?.totals.vat}</p>
                </li>
                <li className="flex justify-between items-center">
                    <p>Grand Total</p>
                    <p>£{checkout?.totals.total}</p>
                </li>
            </ul>

            {shippingOptions && <ShippingOptions options={shippingOptions} />}
            <PaymentOptions options={checkout.payment_options} />

            {paymentOption === 2 && <InvoiceInfo payment={checkout.invoice_initial_payment} />}

            {errorMessage && (
                <Alert my={20} icon={<GoAlert className="w-6 h-6" />} title="There was an issue checking out!" color="red">
                    {errorMessage}
                </Alert>
            )}

            <CheckoutButton />

        </div>
    )
}
