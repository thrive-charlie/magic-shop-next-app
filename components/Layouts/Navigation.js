"use client";

import ApplicationLogo from '@/components/ApplicationLogo'
import Link from 'next/link'
import NavLink from '@/components/NavLink'
import ResponsiveNavLink, {
    ResponsiveNavButton,
} from '@/components/ResponsiveNavLink'
import { useState } from 'react'
import { useSession } from 'next-auth/react';

const Navigation = () => {
    const [open, setOpen] = useState(false);
    const { data } = useSession();

    return (
        <nav className="bg-white border-b border-gray-100">
            {/* Primary Navigation Menu */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/dashboard">
                                <ApplicationLogo className="block h-10 w-auto fill-current text-gray-600" />
                            </Link>
                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <Link href="/dashboard">
                                    Dashboard
                                </Link>
                            </div>
                        </div>

                        <div className='flex items-center justify-end'>
                            {data?.user && (
                                <p>Hi, {data.user.first_name}</p>
                            )}
                        </div>

                        
                </div>
            </div>
        </nav>
    )
}

export default Navigation
