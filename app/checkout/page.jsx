import AppLayout from '@/components/Layouts/AppLayout'
import CheckoutForm from '@/components/checkout/checkout-form'

export default async function Page() {
  return (
      <div className="mt-12 max-w-7xl mx-auto w-full">
        <div className="bg-white rounded p-8">
          <h1 className='text-2xl font-bold mb-4'>Checkout</h1>
          <CheckoutForm />
        </div>
      </div>
  )
}
