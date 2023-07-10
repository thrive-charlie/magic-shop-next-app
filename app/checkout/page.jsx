import CheckoutForm from '@/components/checkout/CheckoutForm'
import CheckoutOptions from '@/components/checkout/CheckoutOptions'

export default async function Page() {
  return (
    <div className="mt-12 max-w-7xl mx-auto w-full">
      <div className="bg-white rounded p-8">
        <h1 className='text-2xl font-bold mb-4'>Checkout</h1>
        <div className="flex">
          <section className="w-3/4 pr-12">
            <CheckoutForm />
          </section>
          <aside className="w-1/4">
            <CheckoutOptions />
          </aside>
        </div>
      </div>
    </div>
  )
}
