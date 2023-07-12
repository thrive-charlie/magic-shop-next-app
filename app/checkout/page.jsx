import CheckoutWrapper from "@/components/checkout/CheckoutWrapper"
import useApi from "@/utils/useApi";

async function getCheckoutSummary() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { serverApiRequest } = useApi();
  return await serverApiRequest({
    url: '/checkout/summary',
    method: 'GET',
    auth: true,
    next: { revalidate: 0 },
  });
}


export default async function Page() {

  const { data, error } = await getCheckoutSummary();

  return (
    <div className="mt-12 max-w-7xl mx-auto w-full px-8">
      <h1 className='text-2xl font-bold mb-4'>Checkout</h1>
      <CheckoutWrapper checkout={data} />
    </div>
  )
}
