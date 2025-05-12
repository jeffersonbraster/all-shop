"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useProductFilters } from "../../hooks/use-products-filters";

interface ProductListProps {
  category?: string;
}

const ProductList = ({ category }: ProductListProps) => {
  const [filters] = useProductFilters()
  
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.products.getMany.queryOptions({
      category,
      ...filters,
    })
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
      {data?.docs.map((product) => (
        <div key={product.id} className="border rounded-md bg-white p-4">
          <h2 className="text-xl">{product.name}</h2>
          <p>{product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;

export const ProductListSkeleton = () => {
  return <div>loading..</div>;
};
