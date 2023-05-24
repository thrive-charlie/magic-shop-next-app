import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import CheckoutBtn from "@/components/cart/checkout-btn";
import AppLayout from "@/components/Layouts/AppLayout";

async function getCart() {
  const { user } = await getServerSession(authOptions);
  const res = await fetch(`http://127.0.0.1:8000/api/cart`, {
    headers: {
      Authorization: `Bearer ${user.access_token}`,
    },
  });
  return await res.json();
}

export default async function CartPage() {

  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  const cart = await getCart();

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto w-full bg-white my-20">
        <div className="p-6">
          <p>Cart</p>
          {cart?.items ? (
            <div className="my-4 p-2">
              <div className="mb-4">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex items-center">
                    <p className="mr-4">{item.product.name}</p>
                    <p className="mr-4">Line Item £{item.product.price}</p>
                    <p>Qty: {item.quantity}</p>
                  </div>
                ))}
              </div>
              <div className="mb-8">
                <p className="text-xl">Total: £{cart.total}</p>
              </div>
              <CheckoutBtn stripePromise={stripePromise} />
            </div>
          ) : (
            <div>
              <p>Your cart is currently empty!</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
