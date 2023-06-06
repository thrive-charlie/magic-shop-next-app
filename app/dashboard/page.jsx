import Head from 'next/head'
import SessionTest from '@/components/session-test';
import SignOut from '@/components/auth/sign-out';
import { useApi } from '@/utils/useApi';
import Table from '@/components/dashboard/table';

export default async function DashboardPage() {

    const { data, error } = await useApi('/dashboard', 'GET');

    return (
        <main>
            <div className="max-w-7xl mx-auto mt-12">
                <div className="p-6 bg-white border-b border-gray-200 rounded">
                    {data.orders && (
                        <Table orders={data.orders} />
                    )}
                </div>
            </div>
        </main>
    )
}
