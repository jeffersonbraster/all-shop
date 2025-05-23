import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import React, { Suspense } from "react";
import Footer from "@/modules/home/ui/components/footer";
import Navbar from "@/modules/home/ui/components/navbar";
import SearchFilters, { SearchFiltersLoading } from "@/modules/home/ui/components/search-filters";

const HomeLayout = async ({ children }: { children: React.ReactNode }) => {
  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(
    trpc.categories.getMany.queryOptions()
  )

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<SearchFiltersLoading />}>
          <SearchFilters  />
        </Suspense>
      </HydrationBoundary>
      
      <div className="flex-1 bg-[#f4f4f0]">{children}</div>

      <Footer />
    </div>
  );
};

export default HomeLayout;
