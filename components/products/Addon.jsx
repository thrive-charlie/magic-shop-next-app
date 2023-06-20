"use client"
import React from 'react'

export default function Addon({ id, name, price, image, tooltip, selected, clickHandler }) {

    return (
        <div className='flex flex-col items-center group' onClick={() => clickHandler({ id, name, price })}>
            <div className="rounded-full mb-2">
                <i
                    className={
                        `block w-16 h-16 cursor-pointer rounded-full bg-emerald-500 transition-all group-hover:bg-emerald-400 
                        ${selected ? 'border-4 border-emerald-800' : ''}`
                    }
                />
            </div>
            <p>{name}</p>
            {price > 0 && <p className='text-xs'>+ £{price}</p>}
        </div>
    )
}
