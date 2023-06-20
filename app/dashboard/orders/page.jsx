import Table from '@/components/dashboard/table';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

async function getOrders(token) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/dashboard`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    console.log(res);
    const data = await res.json();
    return { data: data.orders };
}

export default async function DashboardPage() {

    const { user } = await getServerSession(authOptions);
    const { data } = await getOrders(user.access_token);

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
