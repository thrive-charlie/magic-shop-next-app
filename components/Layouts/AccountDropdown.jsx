"use client"
import React from 'react'
import { Menu } from '@mantine/core'
import { BiLogOutCircle, BiPackage, BiUserCircle } from 'react-icons/bi'
import Link from 'next/link'
import { signIn, signOut } from 'next-auth/react';

export default function AccountDropdown({ name }) {

    return (
        <Menu shadow="md" width={200}>
            <Menu.Target>
                <div
                    className='flex items-center mr-4 py-2 px-4 rounded-lg bg-zinc-100 cursor-pointer transition-all hover:bg-zinc-200'>
                    <i className='block w-6 h-6 mr-2 bg-emerald-500 rounded-full'></i>
                    <p>Hey {name}</p>
                </div>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Label>Account</Menu.Label>
                <Menu.Item
                    component={Link}
                    href="/dashboard/orders"
                    icon={<BiPackage className="w-6 h-6" />}>View Orders</Menu.Item>
                <Menu.Item
                    component={Link}
                    href="/dashboard/account"
                    icon={<BiUserCircle className="w-6 h-6" />}>Account Details</Menu.Item>
                <Menu.Item
                    onClick={signOut}
                    icon={<BiLogOutCircle className="w-6 h-6" />}>Logout</Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}
