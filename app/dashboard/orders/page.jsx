import Title from '@/components/common/Title';
import Table from '@/components/dashboard/table';
import getApi from '@/utils/getApi';


async function getOrders() {
    const data = getApi('/dashboard/orders', { authRequired: true, cache: 'no-cache' });
    return data;
}

export default async function DashboardPage() {

    const { orders } = await getOrders();

    return (
        <main>
            <div className="max-w-7xl mx-auto mt-12">
                <div className="p-6 bg-white border-b border-gray-200 rounded">
                    <Title>Previous Orders</Title>
                    <p className='mb-4'>You{`'`}ve placed a total of <strong>{orders.length}</strong> orders.</p>
                    {orders && (
                        <Table orders={orders} />
                    )}
                </div>
            </div>
        </main>
    )
}
