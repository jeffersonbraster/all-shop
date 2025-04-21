import React from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import SearchFilters from "./search-filters";

import { getPayload } from "payload";
import configPromise from "@payload-config";
import { Category } from "@/payload-types";
import { CustomCategory } from "./types";

const HomeLayout = async ({ children }: { children: React.ReactNode }) => {
  const payload = await getPayload({
    config: configPromise,
  })

  const data = await payload.find({
    collection: "categories",
    depth: 1, // Populate the parent and subcategories
    pagination: false,
    where: {
      parent: {
        exists: false,
      }
    }
  });

  const formattedData: CustomCategory[] = data.docs.map((doc) => ({
    ...doc,
    subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
      ...(doc as Category),
      subcategories: undefined
    }))
  }));

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <SearchFilters data={formattedData} />
      <div className="flex-1 bg-[#f4f4f0]">{children}</div>

      <Footer />
    </div>
  );
};

export default HomeLayout;
