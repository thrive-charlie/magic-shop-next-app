import React from "react";
import { getServerSession } from "next-auth/next";
import Link from "next/link";
import {BsArrowRight} from 'react-icons/bs'
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Button from "@/components/common/button";

async function getCart() {
  const { user } = await getServerSession(authOptions);
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart`, {
    headers: {
      Authorization: `Bearer ${user.access_token}`,
    },
  });
  return await res.json();
}

export default async function CartPage() {

  const cart = await getCart();

  return (
      <div className="max-w-5xl mx-auto w-full bg-white my-20">
        <div className="p-6">
          <h1 className="font-bold text-4xl tracking-tighter mb-2">Cart</h1>
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
              <Link href="/checkout" className="p-2 rounded bg-slate-900 text-white">
                Checkout
              </Link>
            </div>
          ) : (
            <div>
              <p className="text-lg tracking-tight mb-2">Your cart is currently empty!</p>
              <Button as={Link} href="/products" icon={BsArrowRight}>View Products</Button>
            </div>
          )}
        </div>
      </div>
  );
}
