import React from 'react'
import Button from '@/components/common/button'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'

export default function QuantitySelector({ quantity, decrease, increase }) {
    return (
        <div className='flex items-center'>
            <Button onClick={decrease} icon={AiOutlineMinus} />
            <p className='mx-4'>{quantity}</p>
            <Button onClick={increase} icon={AiOutlinePlus} />
        </div>
    )
}
