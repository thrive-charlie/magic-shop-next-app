"use client"

import React, { useContext } from 'react'
import { CheckoutProvider, CheckoutContext } from '@/components/providers/CheckoutProvider'
import CheckoutForm from '@/components/checkout/CheckoutForm'
import CheckoutOptions from '@/components/checkout/CheckoutOptions'

export default function CheckoutWrapper({ checkout }) {
    return (
        <CheckoutProvider>
            <section className="w-2/3 pr-12">
                <CheckoutForm />
            </section>
            <aside className="w-1/3">
                <CheckoutOptions checkout={checkout} />
            </aside>
            {/* </form> */}
        </CheckoutProvider>
    )
}
