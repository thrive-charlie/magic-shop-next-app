import AppLayout from "@/components/Layouts/AppLayout";
import ProductCustomiser from "@/components/customiser/product-customiser";

// Disables SSR, required to make Konva work
export const dynamic = 'force-dynamic';

export default async function Page() {
    
  return (
    <AppLayout>
        <div className="max-w-7xl mx-auto w-full mt-12">
            <div className="p-8 bg-white rounded">
                <ProductCustomiser />
            </div>
        </div>
    </AppLayout>
  )
}
