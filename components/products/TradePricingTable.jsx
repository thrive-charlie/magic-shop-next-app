"use client";

import React from 'react'
import { Table } from '@mantine/core';

export default function TradePricingTable() {

    const pricing = [
        { quantity: 1, price: 10.00, saving: 0.00 },
        { quantity: 2, price: 9.50, saving: 0.50 },
        { quantity: 3, price: 9.00, saving: 1.00 },
        { quantity: 4, price: 8.50, saving: 1.50 },
    ];

    const rows = pricing.map((group) => (
        <tr key={group.quantity}>
            <td>{group.quantity}</td>
            <td>{group.price}</td>
            <td>{group.saving}</td>
        </tr>
    ));

    return (
        <figure className='max-h-[10rem] overflow-auto mb-4'>
            <figcaption className='font-bold tracking-tighter text-lg mb-2'>Trade Bulk Pricing</figcaption>
            <Table striped highlightOnHover withBorder withColumnBorders>
                <thead>
                    <tr>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Saving</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </figure>
    )
}
