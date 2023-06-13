import ProductGallery from '@/components/products/product-gallery';
import AddonSelector from '@/components/products/AddonSelector';

// Get product from API
async function getProducts(slug) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${slug}`);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    console.log(res);
    throw new Error('Failed to fetch data');
  }
  return await res.json();
}

export default async function ProductSinglePage({ params }) {

  // Pull in this product page data and build up page
  const { id, name, description, price, addon_groups: groups } = await getProducts(params.slug);

  return (
    <main className='max-w-7xl mx-auto grid grid-cols-2 gap-12 px-8'>
      <aside>
        <ProductGallery />
      </aside>
      <section className='bg-white shadow py-20 px-8'>
        <header className='mb-4'>
          <h1 className='text-4xl font-bold tracking-tighter mb-2'>{name}</h1>
          <p>{description}</p>
          <p>From £{price}</p>
        </header>
        {id === 10 && (
          <p>Show trade pricing table</p>
        )}

        <AddonSelector id={id} groups={groups} />

      </section>
    </main>
  )

}

// Generate all product pages
export async function generateStaticParams() {
  const products = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`).then((res) => res.json());
  return products.map((products) => ({
    slug: products.slug,
  }));
}