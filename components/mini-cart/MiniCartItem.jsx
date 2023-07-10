import React from 'react'

export default function MiniCartItem({ product, quantity }) {
    return (
        <article className='flex items-center justify-between mb-4'>
            <h2 className='font-bold tracking-tighter text-lg'>{product.name}</h2>
            <p>Qty: {quantity}</p>
        </article>
    )
}
