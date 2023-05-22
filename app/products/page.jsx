import AppLayout from "@/components/Layouts/AppLayout";
import Link from "next/link";
import React from "react";

// Get product from API
async function getProducts() {
  const res = await fetch(`http://127.0.0.1:8000/api/products`);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  return await res.json();
}

export default async function ProductsPage() {
  const data = await getProducts();

  return (
    <AppLayout>
      ProductsPage
      <pre className="my-4 block w-full bg-gray-200">
        {JSON.stringify(data, null, 2)}
      </pre>
      {data.map(item => (
        <div key={item.id}>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <Link href={`/products/${item.slug}`}>
                View product
            </Link>
        </div>
      ))}
    </AppLayout>
  );
}
