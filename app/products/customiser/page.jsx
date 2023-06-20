"use client";
import { useApi } from "@/utils/useApi";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

// Disables SSR, required to make Konva work
const ProductCustomiser = dynamic(() => import("@/components/customiser/ProductCustomiser"), {
  ssr: false,
});

// Destructuring props to searchParams caused NextJS errors to be thrown
export default async function Page(props) {

  // Redirect if no product is provided
  const router = useRouter();
  if (!props?.searchParams?.id) {
    router.push("/");
  }

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
