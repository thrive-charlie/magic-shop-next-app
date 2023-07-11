import Button from "@/components/common/button";
import getApi from "@/utils/getApi";
import Link from "next/link";

async function getData(sessionId) {
  const data = getApi('/checkout/complete', {
    requestType: 'POST',
    authRequired: true,
    cache: 'no-cache',
    data: { session_id: sessionId },
  });
  return data;
}

export default async function Page({ searchParams }) {

  const data = await getData(searchParams.session_id);

  return (
    <main className='my-8 mx-auto max-w-7xl'>
      <div className="p-8 bg-white rounded text-center">
        <h1 className="font-bold text-3xl tracking-tighter mb-4">Order Placed!</h1>
        <p className="mb-2">Thanks for your order, it will be despatched within 10 working days.</p>
        <p className="mb-4">Your order ID is <strong>{data.order_id}</strong>. Your payment of £{data.total} has been receieved.</p>
        <div className="flex justify-center gap-4">
          <Button as={Link} href="/products">Continue Shopping</Button>
          <Button as={Link} href="/dashboard">View Account</Button>
        </div>
      </div>
    </main>
  )
}
