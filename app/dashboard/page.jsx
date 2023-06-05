import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import SessionTest from '@/components/session-test';
import SignOut from '@/components/auth/sign-out';

export default async function DashboardPage() {

    return (
        <main>
            <Head>
                <title>Laravel - Dashboard</title>
            </Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            You are logged in!
                            <SessionTest />
                            <SignOut />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
