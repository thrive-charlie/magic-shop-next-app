"use client";

import React, { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./checkout-form";
import { useSession } from "next-auth/react";

export default function CheckoutBtn({ stripePromise }) {
  const [clientSecret, setClientSecret] = useState("");
  const { data: session, status } = useSession();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    if (session) {
        console.log(session, 'http://127.0.0.1:8000/api/checkout')
        fetch("http://127.0.0.1:8000/api/checkout", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.user.access_token}`,
        },
        })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.client_secret));
    }
}, [session]);

  const options = {
    clientSecret,
    appearance: {
        theme: 'stripe',
      },
  };

  return (
    <>
      {/* <button
        onClick={handleCheckout}
        className="px-4 py-1 rounded bg-slate-900 text-white"
      >
        Checkout
      </button> */}
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}
