import AppLayout from '@/components/Layouts/AppLayout'
import AddToCart from '@/components/cart/add-to-cart';
import React from 'react'

// Get product from API
async function getProducts(slug) {
  const res = await fetch(`http://127.0.0.1:8000/api/products/${slug}`);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    console.log(res);
    throw new Error('Failed to fetch data');
  }
  return await res.json();
}

export default async function ProductSinglePage({ params }) {

    // Pull in this product page data and build up page
    const { id, name, description, price } = await getProducts(params.slug);

  return (
    <main>
      <div className="max-w-7xl mx-auto w-full bg-white mt-8">
        <div className="p-6">
          <h1>{name} - ID {id}</h1>
          <p>{description}</p>
          <p>£{price}</p>
          <AddToCart id={id} />
        </div>
      </div>
    </main>
  )
  
}

// Generate all product pages
export async function generateStaticParams() {
    const products = await fetch('http://127.0.0.1:8000/api/products').then((res) => res.json());
    return products.map((products) => ({
      slug: products.slug,
    }));
  }