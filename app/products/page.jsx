import AppLayout from "@/components/Layouts/AppLayout";
import ProductCard from "@/components/products/product-card";
import Link from "next/link";
import React from "react";

// Get product from API
async function getProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  return await res.json();
}

export default async function ProductsPage() {
  const data = await getProducts();

  return (
    <main className="max-w-7xl mx-auto w-full">
      <div className="p-8 mt-8 rounded bg-white">

        <h1 className="text-3xl tracking-tight font-bold mb-4">All Products</h1>

        <div className="grid grid-cols-3 gap-12">
          {data.map(item => (
            <ProductCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </main>
  );
}

export const metadata = {
  title: 'Products',
  description: 'All products',
  keywords: 'products',
};