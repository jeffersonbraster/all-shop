import { Suspense } from "react";
import ProductList, { ProductListSkeleton } from "@/modules/Products/ui/components/product-list";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";


interface SubcategoryPageProps {
  params: Promise<{ subcategory: string }>;
}

const SubcategoryPage = async ({ params }: SubcategoryPageProps) => {
  const { subcategory } = await params;

  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(trpc.products.getMany.queryOptions({
    category: subcategory
  }))

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<ProductListSkeleton />}>
        <ProductList category={subcategory} />
        </Suspense>
      </HydrationBoundary>
    </div>
  )
}

export default SubcategoryPage