import ProductCustomiser from "@/components/customiser/product-customiser";
import { useApi } from "@/utils/useApi";

// Disables SSR, required to make Konva work
export const dynamic = 'force-dynamic';

export default async function Page() {
    
  // useApi('/api/products/');

  return (
    <main>
        <div className="max-w-7xl mx-auto w-full mt-12">
            <div className="p-8 bg-white rounded">
                <ProductCustomiser />
            </div>
        </div>
    </main>
  )
}
