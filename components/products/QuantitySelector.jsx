import React from 'react'
import { ActionIcon } from '@mantine/core'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'

export default function QuantitySelector({ quantity, decrease, increase }) {
    return (
        <div className='flex items-center'>
            <ActionIcon color="violet" variant="filled" onClick={decrease}>
                <AiOutlineMinus className='w-4 h-4' />
            </ActionIcon>
            <p className='mx-4'>{quantity}</p>
            <ActionIcon color="violet" variant="filled" onClick={increase}>
                <AiOutlinePlus className='w-4 h-4' />
            </ActionIcon>
        </div>
    )
}
