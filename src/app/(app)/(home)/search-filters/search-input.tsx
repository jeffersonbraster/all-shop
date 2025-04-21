"use client"

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { ListFilterIcon, SearchIcon } from "lucide-react";
import { CustomCategory } from "../types";
import CategoriesSidebar from "./categories-sidebar";
import { Button } from "@/components/ui/button";

interface SearchInputProps {
  disabled?: boolean;
  data: CustomCategory[];
}

const SearchInput = ({ disabled, data }: SearchInputProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex items-center gap-2 w-full">
      <CategoriesSidebar data={data} open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />

      <div className="relative w-full">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input className="pl-8" placeholder="Buscar produtos" disabled={disabled} />
      </div>

      <Button variant={"elevated"} className="size-12 shrink-0 flex lg:hidden" onClick={() => setIsSidebarOpen(true)}>
        <ListFilterIcon className="size-4" />
      </Button>
    </div>
  )
}

export default SearchInput