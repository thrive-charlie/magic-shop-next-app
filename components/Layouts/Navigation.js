"use client";

import ApplicationLogo from '@/components/ApplicationLogo'
import Link from 'next/link'

const Navigation = ({ user }) => {

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
                                <Link href="/products">
                                    Products
                                </Link>
                                <Link href="/cart">
                                    Cart
                                </Link>
                            </div>
                        </div>

                        <div className='flex items-center justify-end'>
                            {user && (
                                <p>Hi, {user.first_name}</p>
                            )}
                        </div>

                        
                </div>
            </div>
        </nav>
    )
}

export default Navigation
