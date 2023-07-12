"use client"
import React, { useContext } from 'react'
import { CheckoutContext } from "@/components/providers/CheckoutProvider";
import CheckoutButton from "./CheckoutButton";
import PaymentOptions from "./PaymentOptions";
import ShippingOptions from "./ShippingOptions";
import InvoiceInfo from "./InvoiceInfo";

export default function CheckoutOptions({ checkout }) {

    const { paymentOption } = useContext(CheckoutContext);

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

            {checkout.shipping_options && <ShippingOptions options={checkout.shipping_options} />}
            <PaymentOptions options={checkout.payment_methods} />

            {paymentOption === 2 && <InvoiceInfo payment={checkout.invoice_initial_payment} />}

            <CheckoutButton />

        </div>
    )
}
