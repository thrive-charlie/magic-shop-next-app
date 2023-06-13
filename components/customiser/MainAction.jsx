import React from 'react'

export default function MainAction({ children, icon, ...props }) {
    const IconComponent = icon;
    return (
        <button className='rounded p-4 shadow-md bg-white transition-all hover:bg-opacity-50 hover:shadow-sm' {...props}>
            <IconComponent className="w-6 h-6 mx-auto mb-2" />
            {children}
        </button>
    )
}
