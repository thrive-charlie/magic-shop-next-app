import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { getServerSession } from 'next-auth/next';
import SessionTest from '@/components/session-test';
import SignOut from '@/components/auth/sign-out';
import { NextConfig } from '@/pages/api/auth/[...nextauth]';

export async function apiTest() {
    const session = await getServerSession(NextConfig);
    console.log(`Bearer ${session.user.access_token}`)
    const res = await fetch('http://localhost:8000/api/test', {
        headers: {
            authorization: `Bearer ${session.user.access_token}`,
        }
    });
    const data = await res.json();
    return data;
}

export default async function DashboardPage() {

    const data = await apiTest();
    
    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }>
            <Head>
                <title>Laravel - Dashboard</title>
            </Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            You're logged in!
                            <SessionTest />
                            <SignOut />
                            <div className="p-2 rounded bg-gray-200 my-4">
                                <pre>{JSON.stringify(data, null, 2)}</pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
