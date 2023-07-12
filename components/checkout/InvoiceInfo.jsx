import React from 'react'
import { GoInfo } from 'react-icons/go'
import { Anchor } from '@mantine/core'

export default function InvoiceInfo({ payment }) {
    return (
        <div className="my-4 p-4 rounded bg-gray-100 flex">
            <GoInfo className="w-8 h-8 mr-3" />
            <p className='flex-1'>
                You will pay £{payment} today and be invoiced for the remaining £{payment} when
                your order is ready to ship.
                <Anchor href="#" className='ml-1'>See more info</Anchor>.
            </p>
        </div>
    )
}
