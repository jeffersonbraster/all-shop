"use client";

import { useParams } from "next/navigation";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

import Categories from "./categories";
import SearchInput from "./search-input";
import { DEFAULT_CATEGORY_COLOR } from "@/modules/home/constants";
import BreadCrumbNavigation from "./bread-crumb-navigation";

const SearchFilters = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());

  const params = useParams();
  const categoryParam = params.category as string | undefined;
  const activeCategory = categoryParam || "all";

  const activeCategoryData = data.find(
    (category) => category.slug === activeCategory
  );

  const activeCategoryColor =
    activeCategoryData?.color || DEFAULT_CATEGORY_COLOR;
  const activeCategoryName = activeCategoryData?.name || null;

  const activeSubCategory = params.subcategory as string | undefined;
  const activeSubcategoryName =
    activeCategoryData?.subcategories.find(
      (sub) => sub.slug === activeSubCategory
    )?.name || null;

  return (
    <div
      className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full"
      style={{ backgroundColor: activeCategoryColor }}
    >
      <SearchInput />
      <div className="hidden lg:block">
        <Categories data={data} />
      </div>
      <BreadCrumbNavigation
        activeCategory={activeCategory}
        activeCategoryName={activeCategoryName}
        activeSubcategoryName={activeSubcategoryName}
      />
    </div>
  );
};

export default SearchFilters;

export const SearchFiltersLoading = () => {
  return (
    <div
      className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full"
      style={{ backgroundColor: "#f5f5f5" }}
    >
      <SearchInput disabled />
      <div className="hidden lg:block">
        <div className="h-11"></div>
      </div>
    </div>
  );
};
