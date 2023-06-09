"use client";
import { useApi } from "@/utils/useApi";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

// Disables SSR, required to make Konva work

const ProductCustomiser = dynamic(() => import("@/components/customiser/product-customiser"), {
  ssr: false,
});

export default async function Page({ searchParams }) {

  // Redirect if no product is provided
  const router = useRouter();
  if (!searchParams?.id) {
    router.push("/");
  }

  const data = await useApi(`/api/customiser/${searchParams.id}`);

  return (
    <main>
        <div className="max-w-8xl mx-auto w-full mt-12">
            <div className="p-8 bg-white rounded">
                <ProductCustomiser />
            </div>
        </div>
    </main>
  )
}
