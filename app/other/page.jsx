import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { getServerSession } from 'next-auth/next';
// import { NextAuth } from "pages/api/auth/[...nextauth]"
import SessionTest from '@/components/session-test';
import SignOut from '@/components/auth/sign-out';


export default async function OtherPage() {

    const session = await getServerSession();
    console.log('sesh', session);
    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Other Page
                </h2>
            }>
            <Head>
                <title>Laravel - Other Page</title>
            </Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            You're logged in?
                            <SessionTest />
                            <SignOut />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
