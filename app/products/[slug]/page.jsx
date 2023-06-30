import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import ProductGallery from '@/components/products/product-gallery';
import AddonSelector from '@/components/products/AddonSelector';
import TradePricingTable from "@/components/products/TradePricingTable";

// Get product from API
async function getProduct(slug) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${slug}`, { next: { revalidate: 100 } });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return await res.json();
}

export default async function ProductSinglePage({ params }) {

  const data = await getServerSession(authOptions);

  // Pull in this product page data and build up page
  const { id, name, description, price, addon_groups: groups, images } = await getProduct(params.slug);

  return (
    <main className='max-w-7xl mx-auto grid grid-cols-2 gap-12 px-8'>
      <aside>
        <ProductGallery images={images} />
      </aside>
      <section className='bg-white shadow py-20 px-8 relative'>

        <div className="sticky top-12">

          <header className='mb-4'>
            <h1 className='text-4xl font-bold tracking-tighter mb-2'>{name}</h1>
            <p>{description}</p>
            <p>From £{price}</p>
          </header>

          {data?.user?.type === 'trade' && (
            <TradePricingTable />
          )}

          <AddonSelector id={id} groups={groups} />
        </div>

      </section>
    </main>
  )

}

/**
 * Generates metadata for a product page.
 */
export async function generateMetadata({ params }) {
  const { name, description, keywords } = await getProduct(params.slug);
  return {
    title: name,
    description: description,
    keywords: keywords ?? '',
  }
}

/**
 * Generate all product pages.
 * 
 * @returns array
 */
export async function generateStaticParams() {
  console.log(`Loading from ${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`)
  const products = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`, { next: { revalidate: 100 } }).then((res) => res.json());
  return products.map((products) => ({
    slug: products.slug,
  }));
}
