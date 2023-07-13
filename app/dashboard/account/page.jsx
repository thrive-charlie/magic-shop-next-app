import React from 'react'

export default function AccountPage() {
    return (
        <main className="max-w-7xl mx-auto mt-12">
            <div className="p-6 bg-white border-b border-gray-200 rounded">
                <h1 className='text-4xl font-bold tracking-tighter mb-4'>Your Account</h1>
                <p className='text-lg tracking-tight'>Manage your account details</p>

                <form onSubmit={e => e.preventDefault()}>

                    {/* 
                        first name
                        last name
                        email
                        email confirm
                        password
                        password confirm
                    */}


                </form>

            </div>
        </main>
    )
}
